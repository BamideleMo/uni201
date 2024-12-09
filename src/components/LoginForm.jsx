import { A, useNavigate } from "@solidjs/router";
import TextInput from "./TextInput";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { createSignal } from "solid-js";

const schema = z.object({
  username: z.string().email("*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function LoginForm(props) {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [data, setData] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    await doLogin(formData().username, "1234");
  };

  const doLogin = async (uname, pword) => {
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
          username: uname,
          password: pword,
        }),
      });
      const result = await response.json();
      if (!result.success) {
        if (result.response === "NEW") {
          createAcct(uname, pword);
        } else {
          setMessage(result.response);
          setIsProcessing(false);
        }
      } else {
        var store = {
          email: result.response.email,
          custom_id: result.response.custom_id,
          user_role: result.response.role,
          token: result.response.token,
          expiry: now.getTime() + 10800000,
        };
        setData(store);
        localStorage.setItem("UNI201User", JSON.stringify(data()));
        if (result.response.status === "unconfirmed") {
          window.location.replace(
            "/confirm-email?e=" +
              uname +
              "&i=" +
              "qwertymnbvcxa1234560987asdfg",
            {
              replace: true,
            }
          );
        } else {
          const response = await fetch(VITE_API_URL + "/open/latest-post", {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            method: "GET",
          });
          const result = await response.json();
          if (result.success) {
            window.location.replace(
              "/post/" +
                result.response[0].issue_number +
                "/" +
                result.response[0].slug
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createAcct = async (uname, pword) => {
    try {
      const response = await fetch(VITE_API_URL + "/auth/register", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: uname,
          password: pword,
        }),
      });
      const result = await response.json();
      console.log(result.success);
      if (result.success) {
        await sendEmail(uname);
        await doLogin(uname, pword);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async (uname) => {
    try {
      const response = await fetch(VITE_API_URL + "/auth/send-email", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: uname,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("sent email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      autocomplete="off"
      onSubmit={submit}
      class="w-72 mx-auto space-y-4 border-y-2 py-2"
    >
      <div>
        <TextInput
          label="Email:"
          name="username"
          required={true}
          type="email"
          placeholder="Enter your email here.. ."
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
                    class="bg-cyan-600 rounded-lg w-full p-4 text-center hover:opacity-60"
                  >
                    Proceed
                  </button>
                }
              >
                <button
                  disabled
                  class="bg-gray-600 rounded-lg cursor-none w-full p-4 text-center animate-pulse"
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
            Proceed
          </button>
        </Show>
      </div>
    </form>
  );
}

export default LoginForm;
