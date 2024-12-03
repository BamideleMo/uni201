import { A, useNavigate } from "@solidjs/router";
import Logo from "./Logo";

function Footer() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("UNI201User");
    navigate("/", { replace: true });
  };
  return (
    <div class="bg-white border-t py-10 mt-0 lg:p-20 xl:py-28 text-slate-950 text-sm text-center space-y-6">
      <div class="space-x-4 text-center text-gray-400 text-base">
        <A href="/about">About</A>
        <b>.</b>
        <A href="/terms">Terms of use</A>
        <b>.</b>
        <A href="/privacy">Privacy Policy</A>
      </div>
      <div>
        <Logo />
        <div class="text-gray-400 -mt-1">www.uni201.com.ng</div>
      </div>
      <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
        <div class="py-3 text-center">
          <span
            onClick={() => {
              logOut();
            }}
            class="cursor-pointer"
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
