import { A } from "@solidjs/router";
import twitterx from "../assets/twitterx.png";
import whatsapp from "../assets/whatsapp.png";
import facebook from "../assets/facebook.png";
import { createSignal } from "solid-js";

function ShareButton(props) {
  const [popup, setPopup] = createSignal(false);

  return (
    <>
      <div class="">
        <div
          onClick={() => {
            setPopup(true);
          }}
          class="text-cyan-700 w-fit p-2 rounded-lg cursor-pointer hover:opacity-60"
        >
          👋🏾 Share Referral Link
        </div>

        <Show when={popup()}>
          <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
            <div class="rounded w-11/12 md:w-96 mx-auto text-base bg-white p-4 border-b-8 border-cyan-600">
              <h4 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
                <div>Share Referral Link 🙏🏾</div>
                <div>
                  <span
                    onClick={() => {
                      setPopup(false);
                    }}
                    class="uppercase text-red-800 hover:opacity-60 cursor-pointer"
                  >
                    Close
                  </span>
                </div>
              </h4>
              <div class="text-white space-y-6">
                <a
                  target="_blank"
                  href={
                    "https://wa.me/?text=" +
                    encodeURI(
                      "I like UNI201, and I think you'd like it too. Check it out: https://uni201.com.ng?ref=" +
                        props.CId
                    )
                  }
                  class="flex justify-between bg-green-600 rounded-lg p-4"
                >
                  <div class="text-white">Share Referral Link to WhatsApp</div>
                </a>
                <a
                  target="_blank"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURI("I like UNI201, and I think you'd like it too.") +
                    "&url=https%3A%2F%2Funi201.com.ng?ref=" +
                    props.CId
                  }
                  class="flex justify-between bg-gray-900 rounded-lg p-4"
                >
                  <div class="text-white">Share Referral Link to X</div>
                </a>
                <a
                  target="_blank"
                  href={
                    "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Funi201.com.ng?ref=" +
                    props.CId
                  }
                  class="flex justify-between bg-blue-800 rounded-lg p-4"
                >
                  <div class="text-white">Share Referral Link to Facebook</div>
                </a>
              </div>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}

export default ShareButton;
