import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createSignal, createEffect, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Skeleton from "../components/Skeleton";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Archive() {
  const [fetching, setFetching] = createSignal(false);
  const [posts, setPosts] = createStore([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(VITE_API_URL + "/open/view-posts", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      });
      const result = await response.json();
      console.log(result.response);

      setPosts(result.response);
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  createEffect(() => {
    setFetching(true);
    fetchPosts();
  });
  return (
    <MetaProvider>
      <Title>All Lessons | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="All Lessons on UNI201." />
      <div>
        <Header />
        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
              <Show
                when={fetching()}
                fallback={
                  <>
                    <div class="bg-white p-2 md:p-6">
                      <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-green-300 p-1">Archive of Lessons</span>
                      </h4>
                      <div class="my-4 space-y-6 text-base">
                        {/* <p>Archive of Lessons:</p> */}

                        <For each={posts}>
                          {(post, i) => (
                            <div class="">
                              <p>
                                <span class="block text-black pt-4">
                                  Lesson #{post.issue_number}
                                </span>
                                <A
                                  href={"/lesson/" + post.issue_number}
                                  class="hover:border-b border-black"
                                >
                                  {post.post_topic}
                                </A>
                              </p>
                            </div>
                          )}
                        </For>
                      </div>
                    </div>
                  </>
                }
              >
                <div class="p-2 md:p-6">
                  <Skeleton />
                </div>
              </Show>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Archive;
