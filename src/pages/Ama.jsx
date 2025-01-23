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

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Ama() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [isProcessing, setIsProcessing] = createSignal(false);
  const [message, setMessage] = createSignal("");

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
  };

  return (
    <MetaProvider>
      <Title>Ask Me Anything | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Ask Me Anything to become a Successful Student Entrepreneur in a Nigerian University!"
      />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">AMA</span>
                </h4>
                <h4 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                  Ask Me Anything!
                </h4>
                <div class="my-4 space-y-6 text-base">
                  <p>
                    Have question(s) about student entrepreneurship? Ask me
                    (anything at all) & I'll answer to the best of my ability:
                  </p>
                  <ol class="list-decimal mx-4 md:mx-6 space-y-6">
                    <li>
                      If you want me to respond to you directly via WhatsApp add
                      your WhatsApp number at the end of your question.
                    </li>
                    <li>
                      If you prefer email, add your email address instead.
                    </li>
                    <li>
                      Regardless, I'll answer and post it as a lesson on this
                      site.
                    </li>
                  </ol>
                  <form autocomplete="off" onSubmit={submit} class="space-y-4">
                    <div>
                      <TextArea
                        label="Ask:"
                        name="question"
                        required={true}
                        type="text"
                        max="160"
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
