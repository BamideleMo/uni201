
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";
import screen from "../assets/uni201-mobile-screen.png";
import Faces from "./Faces";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Hero() {
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
            <h1
              class="text-3xl md:text-4xl lg:text-4xl xl:text-6xl 
               drop-shadow-lg font-bold"
            >
              Avoid Unemployment After Graduation:
            </h1>
            <h1 class="mt-3 capitalize text-lg md:text-3xl text-red-600">
              Through Student Entrepreneurship.
            </h1>
            <div class="my-2 px-1 md:px-8 lg:px-0 text-lg md:text-xl">
              <b>Learn how every Friday—for free:</b>
            </div>
            <div class="mt-4 mb-2 space-x-3">
              <Show
                when={fetching()}
                fallback={
                  <span
                    onClick={() => {
                      JSON.parse(localStorage.getItem("UNI201User"))
                        ? latestIssue()
                        : doPopup();
                    }}
                    class="mx-auto uppercase lg:mx-0 w-fit cursor-pointer bg-cyan-600 text-white h-14 border border-cyan-600 text-center items-center flex px-4 rounded hover:bg-white hover:text-cyan-600"
                  >
                    Sign Up/Sign In Now
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
            <Faces />
          </div>
          <div class="mt-8 md:mt-4 overflow-hidden h-72 md:h-96">
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
