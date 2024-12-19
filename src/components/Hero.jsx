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
      <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-4">
        <div
          class="w-full mx-auto grid grid-cols-1 
          lg:grid-cols-2 lg:py-0"
        >
          <div class="text-center md:text-center lg:text-left lg:pt-0">
            <h1
              class="text-4xl md:text-4xl lg:text-4xl xl:text-6xl 
               drop-shadow-lg font-bold"
            >
              Avoid Unemployment After Graduation:
            </h1>
            <h1 class="md:mt-3 capitalize text-xl md:text-3xl text-red-600">
              Embrace Student Entrepreneurship.
            </h1>
            <div class="mx-2 md:mx-0 bg-cyan-100 border border-cyan-200 rounded-lg p-2 mt-4">
              <div class="mt-0 mb-0 px-1 md:px-8 lg:px-0 text-lg md:text-xl leading-tight">
                Get 1 Lesson Every Saturday Morning To Learn How To Do It:
              </div>
              <div class="md:mt-6">
                <div class="space-x-4 mt-6 mb-4">
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
                    Join UNI201 Now—For FREE
                  </span>
                </div>
                <Faces />
              </div>
            </div>
          </div>
          <div class="mt-8 md:mt-8 overflow-hidden h-72 md:h-96">
            <div class="overflow-hidden w-72 mx-auto md:w-96 h-72 md:h-96 px-2 lg:float-right">
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
