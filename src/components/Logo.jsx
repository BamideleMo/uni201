import { A } from "@solidjs/router";

function Logo() {
  return (
    <div class="text-3xl lg:text-4xl font-bold pt-0 lg:pt-0">
      <A href="/">
        <span class="text-red-600">UNI</span>
        <span class="text-cyan-600">201</span>
      </A>
    </div>
  );
}

export default Logo;
