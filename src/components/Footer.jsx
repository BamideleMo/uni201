import { A, useNavigate } from "@solidjs/router";

function Footer() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("UNI201User");
    window.location.replace("/");
  };
  return (
    <div class="bg-white border-t border-black py-10 mt-0 lg:pt-12 text-slate-950 text-sm text-center space-y-6">
      <div class="space-x-3 md:space-x-4 text-center text-gray-400 text-sm md:text-base">
        <A href="/about" class="text-cyan-600 hover:text-gray-600">
          About
        </A>
        <b class="text-black">.</b>
        <A href="/ask-me-anything" class="text-cyan-600 hover:text-gray-600">
          Question?
        </A>
        <b class="text-black">.</b>
        <A href="/terms" class="text-cyan-600 hover:text-gray-600">
          Ts & Cs
        </A>
        <b class="text-black">.</b>
        <A href="/privacy" class="text-cyan-600 hover:text-gray-600">
          Privacy
        </A>
      </div>
      <div>Copyright &copy; 2025. All rights reserved.</div>
      <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
        <div class="py-0 text-center">
          <span
            onClick={() => {
              logOut();
            }}
            class="cursor-pointer text-gray-400 hover:opacity-60"
          >
            Sign Out
          </span>
        </div>
      </Show>
    </div>
  );
}

export default Footer;
