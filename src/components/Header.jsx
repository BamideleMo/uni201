import Menu from "./Menu";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import Logo from "./Logo";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";


function Header() {
  const navigate = useNavigate();
  const [popup, setPopup] = createSignal(false);
  const [whichForm, setWhichForm] = createSignal("");
  const [whichIssue, setWhichIssue] = createSignal("");

  return (
    <>
      <Show when={popup()}>
        <Popup whichForm={whichForm()} whichIssue={whichIssue()} />
      </Show>
      <div class="fixed z-40 w-full bg-white shadow-lg">
        <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto px-2 md:px-0 py-3 lg:py-4 flex justify-between">
          <div class="md:mt-1">
            <Logo />
          </div>
          <div class="flex space-x-8 md:space-x-8 lg:space-x-12 md:pt-1 lg:pt-1.5">
            <A href="/search" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 cursor-pointer hover:text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </A>
            <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
              <A href="/likes" class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8 cursor-pointer hover:text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </A>
            </Show>
          </div>
        </div>
      </div>
      <Show when={!navigator.onLine}>
        <div class="fixed flex mx-auto z-50 bg-black bg-opacity-95 top-0 bottom-0 left-0 right-0 items-center h-screen w-screen">
          <div
            class="w-80 mx-auto bg-white p-6 
          space-x-1 rounded-md"
          >
            <div class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-20 text-cyan-600 mx-auto"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-center">
              Please check your internet connection & refresh this page.
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

export default Header;
