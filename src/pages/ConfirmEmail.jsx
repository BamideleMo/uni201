import { useSearchParams } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CodeVerificationForm from "../components/CodeVerificationForm";
import { createSignal, createEffect } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function ConfirmEmail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [popup, setPopup] = createSignal(false);
  const [emailSent, setEmailSent] = createSignal(false);
  const sendEmail = async () => {
    try {
      const response = await fetch(VITE_API_URL + "/auth/send-email", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: searchParams.e,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  createEffect(() => {
    if (!JSON.parse(localStorage.getItem("UNI201User"))) {
      navigate("/", {
        replace: true,
      });
    }
  });
  return (
    <MetaProvider>
      <Title>Confirm your email for UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://uni201.com.ng/" />
      <Meta name="description" content="Confirm your email" />
      <div>
        <Header />
        <Show when={emailSent()}>
          <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
            <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-yellow-400">
              <h4 class="text-lg text-center text-slate-800 font-bold">
                Email Resent Successfully
              </h4>
              <p class="py-3 border-y-2 my-3">
                The Verification Code has been resent to <b>{searchParams.e}</b>{" "}
                successfully. Check your Inbox or Spam folder please.
              </p>
              <div class="text-center">
                <button
                  onClick={() => {
                    setEmailSent(!emailSent());
                  }}
                  class="bg-blue-800 text-white text-xs p-3 rounded-md"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </Show>
        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content sm:w-8/12 md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-purple-400 p-1">Hi</span>
                </h4>
                <h4 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Please confirm your email.
                </h4>
                <div class="space-y-6 text-base">
                  <p>Thanks for your interest to join UNI201.</p>
                  <p>
                    Because this is the first time you're using your email{" "}
                    <a class="!text-cyan-600" href={"mailto:" + searchParams.e}>
                      {searchParams.e}
                    </a>{" "}
                    on this website, we need to confirm it is yours.
                  </p>
                  <p>
                    Enter the confirmation code sent to the email in the box
                    below:
                  </p>
                  <CodeVerificationForm whichIssue={searchParams.i} />
                  <p class="bg-cyan-50 p-6 rounded-lg border border-cyan-600">
                    <span class="block">
                      Didn't get the email with a confirmation code?
                      <br />
                      <b>Check your SPAM folder</b> or click link below to
                      resend:
                    </span>
                    <span
                      onClick={() => {
                        sendEmail();
                      }}
                      class="font-semibold text-red-600 hover:opacity-60 cursor-pointer"
                    >
                      Resend Confirmation Code
                    </span>
                  </p>
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

export default ConfirmEmail;
