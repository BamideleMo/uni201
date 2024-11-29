import { A } from "@solidjs/router";
import loading from "../../loading2.gif";

function Loading() {
  return (
    <div>
      <img src={loading} class="mx-auto w-20"/>
    </div>
  );
}

export default Loading;
