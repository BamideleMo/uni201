import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Cta() {
  const navigate = useNavigate();
  const [popup, setPopup] = createSignal(false);
  const [whichForm, setWhichForm] = createSignal("");
  const [whichIssue, setWhichIssue] = createSignal("");

  // const [fetching, setFetching] = createSignal(false);

  // const latestIssue = async () => {
  //   setFetching(true);
  //   try {
  //     const response = await fetch(VITE_API_URL + "/open/latest-post", {
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       method: "GET",
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       navigate("/newsletter/" + result.response[0].issue_number, {
  //         replace: true,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const doPopup = (which) => {
    setPopup(true);
    setWhichForm(which);
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
          <div class="mt-4 lg:mt-10 text-lg md:text-2xl w-fit md:mx-auto">
            <div class="space-x-4 mt-6 mb-4">
              <span
                onClick={() => {
                  doPopup("sign in");
                }}
                class="bg-cyan-700 border border-white p-3 rounded-md text-white cursor-pointer hover:opacity-60"
              >
                Sign In
              </span>
              <span
                onClick={() => {
                  doPopup("create an account");
                }}
                class="bg-red-600 border border-white p-3 rounded-md text-white cursor-pointer hover:opacity-60"
              >
                Create an Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cta;
