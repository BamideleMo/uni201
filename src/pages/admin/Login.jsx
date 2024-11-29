import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { createSignal } from "solid-js";

const schema = z.object({
  username: z.string().email("*Invalid"),
  password: z.string().min(4, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Login() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const navigate = useNavigate();

  const [data, setData] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const now = new Date();

    try {
      const response = await fetch(VITE_API_URL + "/auth/login", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: formData().username,
          password: formData().password,
        }),
      });
      const result = await response.json();
      if (!result.success) {
        setMessage(result.response);
        setIsProcessing(false);
      } else {
        var store = {
          custom_id: result.response.custom_id,
          user_role: result.response.role,
          token: result.response.token,
          expiry: now.getTime() + 10800000,
        };
        setData(store);
        localStorage.setItem("techINJosUser", JSON.stringify(data()));
        navigate("/a/post", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MetaProvider>
      <Title>Login - www.techinjos.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Login to techINJos, the #1 Weekly and Quick Brief for Jos' Tech Ecosystem!"
      />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-pink-300 p-1">Login</span>
                </h2>
                <div class="space-y-6 text-base">
                  <form
                    autocomplete="off"
                    onSubmit={submit}
                    class="my-4 w-80 mx-auto space-y-4"
                  >
                    <div>
                      <TextInput
                        label="Email:"
                        name="username"
                        required={true}
                        type="tel"
                        placeholder=""
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <PasswordInput
                        label="Password:"
                        name="password"
                        required={true}
                        passId="pass1"
                        formHandler={formHandler}
                      />
                    </div>

                    <Show when={message() !== ""}>
                      <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                        {message()}
                      </div>
                    </Show>
                    <div class="text-white">
                      <Show
                        when={formHandler.isFormInvalid()}
                        fallback={
                          <>
                            <Show
                              when={isProcessing()}
                              fallback={
                                <button
                                  type="submit"
                                  class="bg-red-600 rounded-lg w-full p-3 text-center hover:opacity-60"
                                >
                                  Login
                                </button>
                              }
                            >
                              <button
                                disabled
                                class="bg-gray-600 rounded-lg cursor-none w-full p-3 text-center animate-pulse"
                              >
                                Processing.. .
                              </button>
                            </Show>
                          </>
                        }
                      >
                        <button
                          disabled
                          class="bg-gray-400 rounded-lg w-full p-3 text-center cursor-not-allowed"
                        >
                          Login
                        </button>
                      </Show>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Login;
