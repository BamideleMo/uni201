import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";
import screen from "../assets/uni201-mobile-screen.png";
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
      <div class="w-fit mx-2 md:w-11/12 2xl:w-9/12 md:mx-auto pt-4">
        <div
          class="w-full md:mx-auto grid grid-cols-1 
          md:grid-cols-3 lg:grid-cols-3 lg:py-0"
        >
          <div class="text-left md:col-span-2 md:text-left lg:col-span-2 lg:text-left md:pt-0 lg:pt-6">
            <div class="text-gray-800 text-lg uppercase">
              Are you a University Student?
            </div>
            <h1
              class="mt-0 text-4xl md:text-4xl lg:text-4xl xl:text-6xl 
               font-bold text-cyan-600"
            >
              Want to Avoid Unemployment After Graduation?
            </h1>
            <h1 class="md:mt-3 capitalize text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-black">
              <span class="text-black">Embrace</span> Student Entrepreneurship
              🚀
            </h1>
            <div class="w-fit md:mx-0 bg-cyan-100 border border-cyan-300 rounded-lg p-2 mt-4">
              <div class="mt-0 mb-0 px-1 md:px-0 lg:px-0 text-lg lg:text-xl leading-tight">
                Get 1 Lesson Every Saturday Morning To Learn How:
              </div>
              <div class="md:mt-0 flex flex-col lg:flex-row lg:space-x-3">
                <div class="space-x-3 mt-6 mb-4">
                  <span
                    onClick={() => {
                      doPopup("sign in");
                    }}
                    class="bg-cyan-600 p-3 rounded-md text-white cursor-pointer hover:opacity-60"
                  >
                    Sign In
                  </span>
                  <span
                    onClick={() => {
                      doPopup("create an account");
                    }}
                    class="bg-red-600 p-3 rounded-md text-white cursor-pointer hover:opacity-60"
                  >
                    Join Now—For FREE
                  </span>
                </div>
                <Faces />
              </div>
            </div>
          </div>
          <div class="max-h-72 md:max-h-full mt-8 md:mt-0 lg:mt-8 overflow-hidden">
            <div class="ht overflow-hidden w-72 mx-auto md:w-96 px-2 lg:float-right">
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
