import Menu from "./Menu";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import Logo from "./Logo";
import { useNavigate } from "@solidjs/router";
import Popup from "./Popup";
import TextInput from "./TextInput";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

const schema = z.object({
  search: z.string().min(3, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Header() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [menu, setMenu] = createSignal(false);
  const navigate = useNavigate();
  const [popup, setPopup] = createSignal(false);
  const [whichForm, setWhichForm] = createSignal("");
  const [whichIssue, setWhichIssue] = createSignal("");
  const [showSearch, setShowSearch] = createSignal(false);

  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);

  const submit = async (event) => {
    event.preventDefault();
    // setIsProcessing(true);
    // await doLogin(formData().username, "1234");
  };

  return (
    <>
      <Show when={popup()}>
        <Popup whichForm={whichForm()} whichIssue={whichIssue()} />
      </Show>
      <Show when={showSearch()}>
        <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
          <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
            <h2 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
              <div>Search UNI201 </div>
              <div>
                <span
                  onClick={() => {
                    setShowSearch(false);
                  }}
                  class="uppercase text-red-800 hover:opacity-60 cursor-pointer"
                >
                  Close
                </span>
              </div>
            </h2>
            <div>
              <form
                autocomplete="off"
                onSubmit={submit}
                class="w-full mx-auto py-2"
              >
                <div class="flex space-x-2">
                  <div class="grow">
                    <TextInput
                      label="Search:"
                      name="search"
                      required={true}
                      type="text"
                      placeholder="Type text here.. ."
                      formHandler={formHandler}
                    />
                  </div>
                  <div class="w-fit pt-5">
                    <Show
                      when={formHandler.isFormInvalid()}
                      fallback={
                        <>
                          <Show
                            when={isProcessing()}
                            fallback={
                              <button
                                type="submit"
                                class="bg-cyan-600 rounded-lg w-full p-3.5 text-center hover:opacity-60"
                              >
                                Search
                              </button>
                            }
                          >
                            <button
                              disabled
                              class="bg-gray-600 rounded-lg cursor-none w-full p-3.5 text-center animate-pulse"
                            >
                              Wait.. .
                            </button>
                          </Show>
                        </>
                      }
                    >
                      <button
                        disabled
                        class="bg-gray-400 rounded-lg w-full p-3.5 text-center cursor-not-allowed"
                      >
                        Search
                      </button>
                    </Show>
                  </div>
                </div>

                <Show when={message() !== ""}>
                  <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                    {message()}
                  </div>
                </Show>
              </form>
            </div>
          </div>
        </div>
      </Show>
      <div class="fixed z-40 w-full bg-white shadow-lg">
        <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto px-2 md:px-0 py-3 lg:py-4 flex justify-between">
          <div class="md:mt-1">
            <Logo />
          </div>
          <div class="text-lg lg:text-lg flex space-x-6 md:space-x-8">
            <span class="mt-1.5 md:mt-2 lg:mt-2.5">
              <svg
                onClick={() => {
                  setShowSearch(true);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 cursor-pointer hover:text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <Show when={JSON.parse(localStorage.getItem("UNI201User"))}>
              <A href="/likes" class="mt-1.5 md:mt-2 lg:mt-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 cursor-pointer hover:text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </A>
            </Show>
          </div>
        </div>
      </div>
      <Show when={!navigator.onLine}>
        <div class="fixed flex mx-auto z-50 bg-black bg-opacity-95 top-0 bottom-0 left-0 right-0 items-center h-screen w-screen">
          <div
            class="w-80 mx-auto bg-white p-6 
          space-x-1 rounded-md"
          >
            <div class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-20 text-cyan-600 mx-auto"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-center">
              Please check your internet connection & refresh this page.
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}

export default Header;
