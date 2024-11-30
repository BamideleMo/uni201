import { A } from "@solidjs/router";
import Logo from "./Logo";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

import { createSignal, createEffect } from "solid-js";

import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import ChevronRight from "./icons/ChevronRight";
import LoginForm from "./LoginForm";

const schema = z.object({
  username: z.string().email("*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Popup(props) {
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
      <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
        <h2 class="text-lg text-center text-slate-800 font-bold">
          Enter Email to continue {props.close}
        </h2>
        <p class="text-center text-sm w-64 lg:w-72 mx-auto py-2 leading-tight">
          UNI201 is free, but you must sign in to continue reading.
        </p>
        <Show when={theForm() === "sign in"}>
          <LoginForm whichIssue={props.whichIssue} />
        </Show>
      </div>
    </div>
  );
}

export default Popup;
