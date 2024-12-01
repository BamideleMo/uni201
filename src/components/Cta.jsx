import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Cta() {
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
      <div class="w-full mx-auto bg-cyan-600 py-10 px-3 lg:p-20 text-yellow-200">
        <div class="w-full mx-auto drop-shadow-lg">
          <div class="text-xl leading-snug lg:text-4xl lg:leading-10 text-left md:text-center">
            <b class="text-white">Start Now:</b> Avoid Unemployment After
            Graduation!{" "}
            <span class="text-white md:block">
              Embrace Student Entrepreneurship.
            </span>{" "}
            Learn how every Friday—for FREE:
          </div>
          <div class="uppercase mt-4 lg:mt-10 text-lg md:text-2xl w-fit md:mx-auto">
            <Show
              when={fetching()}
              fallback={
                <span
                  onClick={() => {
                    JSON.parse(localStorage.getItem("UNI201User"))
                      ? latestIssue()
                      : doPopup();
                  }}
                  class="mx-auto flex lg:mx-0 w-fit cursor-pointer bg-black text-white border border-black text-center p-2 md:p-4 rounded hover:bg-white hover:text-cyan-600"
                >
                  Sign Up/Sign In Now
                </span>
              }
            >
              <span class="mx-auto lg:mx-0 w-fit space-x-6 cursor-wait border border-cyan-600 bg-slate-600 opacity-60 text-white items-center flex p-2 md:p-4 rounded">
                <span>Fetching Post.. .</span>
                <span class="animate-spin mx-auto w-3 h-3 bg-transparent border-2 border-white rounded">
                  &nbsp;
                </span>
              </span>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cta;
