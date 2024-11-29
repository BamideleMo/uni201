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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 cursor-pointer hover:opacity-60"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
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
              <p class="my-4">
                Help us grow: Let others know about techINJos. 🙏🏾
              </p>
              <div class="text-black space-y-6">
                <a
                  target="_blank"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURI(
                      "I've been reading techINJos Newsletter, and I think you'd also enjoy it. It's an online tech newsletter focused on the tech ecosystem in Jos-Plateau state."
                    ) +
                    "&url=https%3A%2F%2Ftechinjos.com.ng"
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
                      "I've been reading techINJos Newsletter, and I think you'd also enjoy it. It's an online tech newsletter focused on the tech ecosystem in Jos-Plateau state. Check it out: https://techinjos.com.ng"
                    )
                  }
                  class="flex justify-between bg-white rounded-lg p-3"
                >
                  <div>Share with WhatsApp</div>
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
