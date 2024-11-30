import Menu from "./Menu";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import Logo from "./Logo";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";
import screen from "../assets/techINJos-mobile-screen.png";
import hero from "../assets/hero.webp";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Hero() {
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
      <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-4">
        <div
          class="w-full mx-auto grid grid-cols-1 
          lg:grid-cols-2 lg:py-0"
        >
          <div class="text-center md:text-center lg:text-left lg:pt-0">
            <h1 class="uppercase text-xl">Empower Your Future:</h1>
            <h1
              class="text-3xl md:text-4xl lg:text-4xl xl:text-6xl 
               drop-shadow-lg font-bold"
            >
              Become a Student Entrepreneur.
            </h1>
            <div class="text-left my-6 w-fit mx-auto lg:mx-0 flex space-x-1">
              <div class="flex -space-x-2">
                <img
                  src={user1}
                  alt="subscribers"
                  class="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border-2 border-red-600"
                />
                <img
                  src={user2}
                  alt="subscribers"
                  class="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border-2 border-red-600"
                />
                <img
                  src={user3}
                  alt="subscribers"
                  class="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border-2 border-red-600"
                />
                <img
                  src={user4}
                  alt="subscribers"
                  class="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border-2 border-red-600"
                />
                <img
                  src={user5}
                  alt="subscribers"
                  class="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border-2 border-red-600"
                />
              </div>
              <div class="mt-1 md:mt-2">Join 1,003+ Students</div>
            </div>
            <div class="my-4 md:px-8 lg:px-0 text-lg md:text-xl">
              Get one post every week with tips & insights to build a business
              on campus! <b>Don't be left behind</b> 🚀
            </div>
            <div class="my-4 space-x-3">
              <Show
                when={fetching()}
                fallback={
                  <span
                    onClick={() => {
                      JSON.parse(localStorage.getItem("UNI201User"))
                        ? latestIssue()
                        : doPopup();
                    }}
                    class="mx-auto lg:mx-0 w-fit cursor-pointer bg-cyan-600 text-white h-14 border border-cyan-600 text-center items-center flex px-4 rounded hover:bg-white hover:text-cyan-600"
                  >
                    See This Week's Post
                  </span>
                }
              >
                <span class="mx-auto lg:mx-0 w-fit space-x-6 cursor-wait border border-cyan-600 bg-cyan-600 opacity-60 text-white h-14 items-center flex px-4 rounded">
                  <span>Fetching Post.. .</span>
                  <span class="animate-spin mx-auto w-4 h-4 bg-transparent border-2 border-red-600 rounded">
                    &nbsp;
                  </span>
                </span>
              </Show>
            </div>
          </div>
          <div class="mt-6 md:mt-0 overflow-hidden h-72 md:h-96">
            <div class="bg-white overflow-hidden w-72 mx-auto md:w-96 h-72 md:h-96 px-2 lg:float-right">
              <img
                src={screen}
                alt="tech in Jos mobile display"
                class="w-fit mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
