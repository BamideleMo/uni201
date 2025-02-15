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
      console.log(result);
      console.log(result.response);
      if (!result.success) {
        setMessage(result);
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
      <Link rel="canonical" href="https://uni201.com.ng/" />
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
        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content sm:w-8/12 md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
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
                    (anything at all) & I'll answer to the best of my ability.
                  </p>
                  <p>
                    I'll post my answer on this website ASAP. I'll notify you
                    too (if you include your email address in your question).
                  </p>
                  <p>
                    Please use the form below to ask your question:
                  </p>
                  {/* <p>
                    <a
                      target="_blank"
                      href="https://wa.me/2348124802798?text=I%20have%20a%20question."
                      class="hover:opacity-60"
                    >
                      Click here to ask
                    </a>
                    .
                  </p> */}
                  <form>
                    x
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
