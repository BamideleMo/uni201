import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";
import { createStore } from "solid-js/store";

import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

const schema = z.object({
  search: z.string().min(3, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Search() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [posts, setPosts] = createStore([]);

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setMessage("");
    try {
      const response = await fetch(
        VITE_API_URL + "/open/search-posts?search=" + formData().search,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const result = await response.json();

      if (result.response.length < 1) {
        setIsProcessing(false);
        setMessage("No related lesson found!");
      } else {
        setIsProcessing(false);
        setPosts(result.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MetaProvider>
      <Title>Search UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="Search UNI201." />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-blue-300 p-1">Search</span>
                </h4>

                <div class="my-4 space-y-6 text-base">
                  <form
                    autocomplete="off"
                    onSubmit={submit}
                    class="w-full mx-auto py-2 space-y-3"
                  >
                    <div class="flex space-x-2">
                      <div class="grow">
                        <TextInput
                          label="Search for a keyword or phrase:"
                          name="search"
                          required={true}
                          type="text"
                          placeholder="Type text here.. ."
                          formHandler={formHandler}
                        />
                      </div>
                      <div class="w-fit pt-5 text-white text-sm">
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
                                  .. .
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

                  <div class="space-y-4">
                    <For each={posts}>
                      {(post, i) => (
                        <p>
                          <span class="block text-gray-500 text-xs border-t pt-4">
                            {new Date(post.created_at).toDateString()}
                          </span>
                          <A
                            href={
                              "/lesson/" + post.issue_number
                            }
                            class="hover:border-b border-black"
                          >
                            {post.post_topic}
                          </A>
                        </p>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Search;
