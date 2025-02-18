import { A } from "@solidjs/router";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";

function Faces() {
  return (
    <div class="pt-1 text-cyan-900 text-left text-sm w-fit mx-auto flex space-x-1">
      <div class="flex -space-x-2">
        <img
          src={user1}
          alt="subscribers"
          class="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-cyan-600"
        />
        {/* <img
          src={user2}
          alt="subscribers"
          class="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-cyan-600"
        /> */}

        <img
          src={user3}
          alt="subscribers"
          class="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-cyan-600"
        />
        <img
          src={user4}
          alt="subscribers"
          class="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-cyan-600"
        />
        <img
          src={user5}
          alt="subscribers"
          class="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-cyan-600"
        />
      </div>
      <div class="mt-1.5 md:mt-1.5">Join 1,003+ other students!</div>
    </div>
  );
}

export default Faces;
