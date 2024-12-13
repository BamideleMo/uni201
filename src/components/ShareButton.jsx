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
          class="bg-slate-100 w-fit p-2 rounded-lg border cursor-pointer hover:opacity-60"
        >
          👋🏾 Share on WhatsApp
        </div>

        <Show when={popup()}>
          <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
            <div class="rounded w-11/12 md:w-96 mx-auto text-base bg-white p-4 border-b-8 border-cyan-600">
              <h2 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
                <div>Share UNI201 🙏🏾</div>
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
              </h2>
              <div class="text-white space-y-6">
                <a
                  target="_blank"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURI(
                      "I like UNI201, and I think you'd like it too. It's a weekly post focused on helping university students in Nigeria avoid unemployment after graduation by embracing entrepreneurship."
                    ) +
                    "&url=https%3A%2F%2Funi201.com.ng?ref=" +
                    props.CId
                  }
                  class="flex justify-between bg-gray-100 rounded-lg p-4 border border-slate-600"
                >
                  <div class="text-slate-700">Share UNI201 on X</div>
                  <div>
                    <img src={twitterx} class="w-6" />
                  </div>
                </a>
                <a
                  target="_blank"
                  href={
                    "https://wa.me/?text=" +
                    encodeURI(
                      "I like UNI201, and I think you'd like it too. It's a weekly post focused on helping university students in Nigeria avoid unemployment after graduation by embracing entrepreneurship. Check it out: https://uni201.com.ng?ref=" +
                        props.CId
                    )
                  }
                  class="flex justify-between bg-green-100 rounded-lg p-4 border border-slate-600"
                >
                  <div class="text-slate-700">Share UNI201 on WhatsApp</div>
                  <div>
                    <img src={whatsapp} class="w-6" />
                  </div>
                </a>
                <a
                  target="_blank"
                  href={
                    "https://www.facebook.com/share.php?u=https://uni201.com.ng?ref=" +
                    props.CId +
                    "&amp;title=I like UNI201, and I think you'd like it too. It's a weekly post focused on helping university students in Nigeria avoid unemployment after graduation by embracing entrepreneurship."
                  }
                  class="flex justify-between bg-blue-100 rounded-lg p-4 border border-slate-600"
                >
                  <div class="text-slate-700">Share UNI201 on Facebook</div>
                  <div>
                    <img src={facebook} class="w-6" />
                  </div>
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
