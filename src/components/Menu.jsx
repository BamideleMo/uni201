import { A } from "@solidjs/router";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitterx.png";

function Menu() {
  return (
    <ul
      class="flex flex-col mx-6 py-6 text-xl text-center space-y-8 
    lg:py-0 lg:text-left lg:space-y-0 lg:mx-0 lg:flex-row lg:space-x-6 xl:space-x-8 lg:text-sm mt-3"
    >
      <li>
        <A href="/about" class="hover:opacity-60">
          About
        </A>
      </li>
      {/* <li class="pt-3 lg:pt-0">
        <a
          target="_blank"
          href="https://whatsapp.com/channel/0029VaEVLBHBfxoG5GZxz72v"
          class="p-2 border border-black rounded hover:bg-black hover:text-white"
        >
          Ask a Question
        </a>
      </li> */}
    </ul>
  );
}

export default Menu;
