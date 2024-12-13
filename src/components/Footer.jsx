import { A, useNavigate } from "@solidjs/router";
import Logo from "./Logo";

function Footer() {
  const navigate = useNavigate();
  const logOut = () => {
    console.log("out");
    localStorage.removeItem("UNI201User");
    window.location.replace("/");
  };
  return (
    <div class="bg-white border-t py-10 mt-0 lg:p-20 xl:py-28 text-slate-950 text-sm text-center space-y-6">
      <div class="space-x-2 md:space-x-4 text-center text-gray-400 text-base">
        <A href="/about">About</A>
        <b class="text-black">.</b>
        <A href="/archive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 inline"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </A>
        <b class="text-black">.</b>
        <A href="/terms">Terms of use</A>
        <b class="text-black">.</b>
        <A href="/privacy">Pri. Policy</A>
      </div>
      <div>
        <Logo />
        <div class="text-gray-400 -mt-1">www.uni201.com.ng</div>
      </div>
      <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
        <div class="py-0 text-center">
          <span
            onClick={() => {
              logOut();
            }}
            class="cursor-pointer text-red-600 hover:opacity-60"
          >
            Sign Out
          </span>
        </div>
      </Show>
      <div>
        &copy; UNI201 Media - 2024. <br class="md:hidden" />
        All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
