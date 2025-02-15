import { createSignal, createEffect } from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import LoginForm from "./LoginForm";
import { A, useParams, useNavigate } from "@solidjs/router";

const schema = z.object({
  username: z.string().email("*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Popup(props) {
  const params = useParams();

  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [isProcessing, setIsProcessing] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [theForm, setTheForm] = createSignal("");

  createEffect(() => {
    setTheForm(props.whichForm);
  });
  return (
    <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
      <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-2 md:p-4 border-b-8 border-cyan-600">
        <Show when={theForm() === "sign in"}>
          <h4 class="text-lg text-center text-slate-800 font-bold">Sign in</h4>
          <p class="text-center text-sm w-full mx-auto py-2 leading-tight">
            Welcome. Please enter your email address to proceed.
          </p>
        </Show>
        <Show when={theForm() === "create an account"}>
          <h4 class="text-lg text-center text-slate-800 font-bold">
            Join UNI201 Now—For FREE
          </h4>
          <p class="text-center text-sm w-full mx-auto py-2 leading-tight">
            UNI201 is free, but you must a working email to proceed.
          </p>
        </Show>
        <LoginForm ref3={props.ref2} whichIssue={params.issueNumber} />
      </div>
    </div>
  );
}

export default Popup;
