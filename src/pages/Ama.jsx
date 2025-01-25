import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { createSignal, createEffect } from "solid-js";
import TextArea from "./TextArea";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(1, "*Invalid").max(160, "*Too long"),
});

const VITE_TERMII_URL = import.meta.env["VITE_TERMII_URL"];

function Ama() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [isProcessing, setIsProcessing] = createSignal(false);
  const [success, setSuccess] = createSignal(false);
  const [message, setMessage] = createSignal("");

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    console.log(formData().question);
    try {
      const response = await fetch("https://api.ng.termii.com/api/sms/send", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          api_key: VITE_TERMII_URL,
          to: "2347036935026",
          from: "UJG",
          sms: formData().question,
          type: "plain",
          channel: "generic",
        }),
      });
      const result = await response.json();
      if (!result.success) {
        setMessage(result.response);
        setIsProcessing(false);
      } else {
        setSuccess(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MetaProvider>
      <Title>Ask Anything | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Ask Anything to become a Successful Student Entrepreneur in a Nigerian University!"
      />
      <div>
        <Show when={success()}>
          <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
            <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
              <div class="text-center space-y-4 text-base">
                <p>Thanks for your question! Will revert back ASAP.</p>
                <p>
                  <span
                    onClick={() => setSuccess(false)}
                    class="text-cyan-700 hover:opacity-60 cursor-pointer"
                  >
                    Okay
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Show>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">Question?</span>
                </h4>
                <h4 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                  Ask Anything!
                </h4>
                <div class="my-4 space-y-6 text-base">
                  <p>
                    Have question(s) about student entrepreneurship? Ask me
                    (anything at all) & I'll answer to the best of my ability:
                  </p>
                  <ol class="list-disc mx-4 md:mx-10 space-y-6">
                    <li>I'll post my answer on this website;</li>
                    <li>
                      If you want me to notify you when I do, add your WhatsApp
                      number at the end of your question.
                    </li>
                  </ol>
                  <form autocomplete="off" onSubmit={submit} class="space-y-4">
                    <div>
                      <TextArea
                        label="Ask:"
                        name="question"
                        required={true}
                        type="text"
                        max="159"
                        placeholder="Type your Question(s) here..."
                        formHandler={formHandler}
                      />
                    </div>

                    <Show when={message() !== ""}>
                      <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                        {message()}
                      </div>
                    </Show>
                    <div class="text-white flex">
                      <div class="grow">&nbsp;</div>
                      <div class="w-40">
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
                                    Send
                                  </button>
                                }
                              >
                                <button
                                  disabled
                                  class="bg-gray-600 rounded-lg cursor-none w-full p-4 text-center animate-pulse"
                                >
                                  Sending.. .
                                </button>
                              </Show>
                            </>
                          }
                        >
                          <button
                            disabled
                            class="bg-gray-400 rounded-lg w-full p-4 text-center cursor-not-allowed"
                          >
                            Send
                          </button>
                        </Show>
                      </div>
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

export default Ama;
