import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";
import screen from "../assets/uni201-mobile-screen.png";
// import screenshot from "../assets/screenshot.jpeg";
import Faces from "./Faces";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Hero(props) {
  const navigate = useNavigate();
  const [popup, setPopup] = createSignal(false);
  const [whichForm, setWhichForm] = createSignal("");
  const [whichIssue, setWhichIssue] = createSignal("");

  const doPopup = (which) => {
    setPopup(true);
    setWhichForm(which);
    setWhichIssue("latest");
  };

  return (
    <>
      <Show when={popup()}>
        <Popup
          whichForm={whichForm()}
          whichIssue={whichIssue()}
          ref2={props.ref1}
        />
      </Show>
      <div class="text-center w-fit mx-2 md:w-11/12 2xl:w-9/12 md:mx-auto pt-2">
        <div
          class="w-full sm:w-11/12 md:w-10/12 lg:w-3/5 sm:mx-auto grid grid-cols-1 
          "
        >
          <div class="md:pt-0 lg:pt-6">
            <div class="text-gray-800 text-lg md:text-2xl capitalize">
              Dear Nigerian Uni Student:
            </div>
            <h1
              class="mt-2 text-2xl md:text-3xl lg:text-3xl xl:text-4xl 
               font-bold text-black uppercase leading-none"
            >
              Want to Avoid Unemployment After Graduation?
            </h1>
            <h1 class="leading-none mt-2 md:mt-3 capitalize text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-cyan-700">
              Embrace Student Entrepreneurship!
            </h1>
            <div class="w-fit mx-auto bg-cyan-100 border border-cyan-300 rounded-lg p-2 mt-6">
              <div class="mt-0 mb-0 px-1 md:px-0 lg:px-0 text-lg lg:text-xl leading-tight">
                Get 1 Lesson Every Tuesday & Thursday Morning To{" "}
                <b>Learn How</b>:
              </div>
              <div class="md:mt-0 flex flex-col">
                <div class="space-x-3 mt-6 mb-4">
                  <span
                    onClick={() => {
                      doPopup("sign in");
                    }}
                    class="bg-cyan-700 p-3 rounded-md text-white cursor-pointer hover:opacity-60"
                  >
                    Sign In
                  </span>
                  <span
                    onClick={() => {
                      doPopup("create an account");
                    }}
                    class="bg-red-600 p-3 rounded-md text-white cursor-pointer hover:opacity-60"
                  >
                    Subscribe Now—For FREE
                  </span>
                </div>
                <Faces />
              </div>
            </div>
          </div>
          <div class="max-h-72 md:max-h-80 mt-8 md:mt-0 lg:mt-8 overflow-hidden">
            <div class="ht overflow-hidden w-72 mx-auto md:w-80 px-2">
              <img
                src={screen}
                alt="uni201 mobile display"
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
