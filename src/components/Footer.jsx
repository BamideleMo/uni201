import { A, useNavigate } from "@solidjs/router";
import Logo from "./Logo";

function Footer() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("UNI201User");
    navigate("/", { replace: true });
  };
  return (
    <div class="bg-white p-0 mt-0 lg:p-20 xl:py-28 text-slate-950 text-sm text-center space-y-6">
      <div class="space-x-4 text-center text-gray-400 text-base">
        <A href="/about">About</A>
        <b>.</b>
        <A href="/terms">Terms of use</A>
        <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
          <b>.</b>
          <span
            onClick={() => {
              logOut();
            }}
            class="cursor-pointer"
          >
            Sign Out
          </span>
        </Show>
      </div>
      <div>
        <Logo />
        <div class="text-gray-400 -mt-1">www.uni201.com.ng</div>
      </div>
      <div>
        &copy; UNI201 Media - 2024. <br class="md:hidden" />
        All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
