import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "./Header";
import Footer from "./Footer";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { createSignal } from "solid-js";

const schema = z.object({
  code: z.string().length(5, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function CodeVerificationForm(props) {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const navigate = useNavigate();

  const [data, setData] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [invalidCode, setInvalidCode] = createSignal(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const now = new Date();

    if (
      formData().code ===
      JSON.parse(localStorage.getItem("UNI201User")).custom_id
    ) {
      try {
        const response = await fetch(
          VITE_API_URL +
            "/api/edit-user/" +
            JSON.parse(localStorage.getItem("UNI201User")).custom_id,
          {
            mode: "cors",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("UNI201User")).token
              }`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
              status: "confirmed",
            }),
          }
        );
        const result = await response.json();
        window.location.replace("/welcome");
      } catch (error) {
        console.error(error);
      }
    } else {
      setInvalidCode(true);
      setIsProcessing(false);
    }
  };
  return (
    <form autocomplete="off" onSubmit={submit} class="my-4 w-72 flex space-x-2">
      <div class="space-y-2 w-60">
        <div class="">
          <TextInput
            label="Confirmation Code:"
            name="code"
            required={true}
            type="text"
            placeholder="Enter code here.. ."
            formHandler={formHandler}
          />
        </div>

        <Show when={message() !== ""}>
          <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
            {message()}
          </div>
        </Show>
        <Show when={invalidCode()}>
          <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
            Wrong code.
          </div>
        </Show>
      </div>
      <div class="w-11 pt-5 text-white">
        <Show
          when={formHandler.isFormInvalid()}
          fallback={
            <>
              <Show
                when={isProcessing()}
                fallback={
                  <button
                    type="submit"
                    class="bg-red-600 rounded-lg w-full py-3 px-2 text-center hover:opacity-60"
                  >
                    Go
                  </button>
                }
              >
                <button
                  disabled
                  class="bg-gray-600 rounded-lg cursor-none w-full py-3 px-2 text-center animate-pulse"
                >
                  . .
                </button>
              </Show>
            </>
          }
        >
          <button
            disabled
            class="bg-gray-400 rounded-lg w-full p-3 text-center cursor-not-allowed"
          >
            Go
          </button>
        </Show>
      </div>
    </form>
  );
}

export default CodeVerificationForm;
