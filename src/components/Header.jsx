import Menu from "./Menu";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import Logo from "./Logo";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Header() {
  const [menu, setMenu] = createSignal(false);
  const navigate = useNavigate();
  const [popup, setPopup] = createSignal(false);
  const [whichForm, setWhichForm] = createSignal("");
  const [whichIssue, setWhichIssue] = createSignal("");

  const [fetching, setFetching] = createSignal(false);
  const latestIssue = async () => {
    setFetching(true);
    try {
      const response = await fetch(VITE_API_URL + "/open/latest-post", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      });
      const result = await response.json();
      if (result.success) {
        setFetching(false);
        navigate("/newsletter/" + result.response[0].issue_number, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const doPopup = () => {
    setPopup(true);
    setWhichForm("sign in");
    setWhichIssue("latest");
  };
  return (
    <>
      <Show when={popup()}>
        <Popup whichForm={whichForm()} whichIssue={whichIssue()} />
      </Show>
      <div class="fixed z-40 w-full bg-white">
        <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto px-2 md:px-0 py-1 lg:py-4 flex justify-between">
          <Logo />
          <div class="uppercase flex space-x-6 md:space-x-10 xl:space-x-12 pt-3.5 md:pt-2 text-base lg:text-lg">
            <div class="">
              <Show
                when={fetching()}
                fallback={
                  <Show
                    when={JSON.parse(localStorage.getItem("UNI201User"))}
                    fallback={
                      <span
                        onClick={() => {
                          JSON.parse(localStorage.getItem("UNI201User"))
                            ? latestIssue()
                            : doPopup();
                        }}
                        class="text-cyan-600 cursor-pointer hover:opacity-60"
                      >
                        Sign Up/Sign In
                      </span>
                    }
                  >
                    <A
                      href="/"
                      class="text-cyan-600 cursor-pointer hover:opacity-60"
                    >
                      Latest Post
                    </A>
                  </Show>
                }
              >
                <span class="flex text-cyan-600 space-x-1 opacity-60 cursor-wait">
                  <span>Fetching.. .</span>
                  <span class="mt-1.5 lg:mt-1 animate-spin mx-auto w-3 h-3 bg-transparent border-2 border-cyan-600 rounded">
                    &nbsp;
                  </span>
                </span>
              </Show>
            </div>
            <div class="">
              <A href="/about" class="hover:opacity-60">
                About
              </A>
            </div>
          </div>
        </div>
      </div>
      <Show when={!navigator.onLine}>
        <div class="fixed w-full mx-auto z-50">
          <div
            class="w-60 mx-auto bg-yellow-100 border border-yellow-300 p-3 
          mt-6 space-x-1 rounded-md text-xs flex"
          >
            <div class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 text-cyan-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <b>Please check your internet connection & refresh this page.</b>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

export default Header;
