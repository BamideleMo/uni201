import { A } from "@solidjs/router";
import twitterx from "../../src/assets/twitterx.png";
import whatsapp from "../../src/assets/whatsapp.png";
import { createSignal } from "solid-js";

function ShareButton(props) {
  const [popup, setPopup] = createSignal(false);

  const fbShare = () => {
    var fb_url = window.location.href;
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + fb_url,
      "_blank"
    );
  };
  const waShare = () => {
    var wa_url = window.location.href;
    window.open("https://wa.me/?text=" + wa_url, "_blank");
  };
  return (
    <>
      <div class="">
        <div
          onClick={() => {
            setPopup(true);
          }}
        >
          <span class="text-red-600 hover:opacity-6 cursor-pointer0">
            Click here to share
          </span>
          .
        </div>

        <Show when={popup()}>
          <div class="fixed z-50 top-0 bottom-0 left-0 right-0 bg-slate-900 bg-opacity-30 flex items-center">
            <div class="bg-black p-6 w-80 rounded-lg mx-auto text-white text-base">
              <h2 class="flex justify-between">
                <div></div>
                <svg
                  onClick={() => {
                    setPopup(false);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white hover:opacity-60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </h2>
              <p class="my-4">Let others know about UNI201. 🙏🏾</p>
              <div class="text-black space-y-6">
                <a
                  target="_blank"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURI(
                      "I just joinded UNI201, and I think you should check it too. It's a weekly post focused on helping university students in Nigeria avoid unemployment after graduation by embracing entrepreneurship."
                    ) +
                    "&url=https%3A%2F%2Funi201.com.ng"
                  }
                  class="flex justify-between bg-white rounded-lg p-3"
                >
                  <div>Share on X</div>
                  <div>
                    <img src={twitterx} class="w-6" />
                  </div>
                </a>
                <a
                  target="_blank"
                  href={
                    "https://wa.me/?text=" +
                    encodeURI(
                      "I just joinded UNI201, and I think you should check it too. It's a weekly post focused on helping university students in Nigeria avoid unemployment after graduation by embracing entrepreneurship. Check it out: https://uni201.com.ng"
                    )
                  }
                  class="flex justify-between bg-white rounded-lg p-3"
                >
                  <div>Share on WhatsApp</div>
                  <div>
                    <img src={whatsapp} class="w-6" />
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
