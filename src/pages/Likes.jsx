import { A, useNavigate } from "@solidjs/router";
import { createSignal, createEffect, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Likes() {
  const navigate = useNavigate();

  const [fetching, setFetching] = createSignal(true);
  const [posts, setPosts] = createStore([]);

  const logOut = () => {
    localStorage.removeItem("UNI201User");
    window.location.replace("/");
  };

  var theArr = [];

  const getLikes = async () => {
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
      var theRes = result.response;

      for (let index = 0; index < theRes.length; index++) {
        var arr = JSON.parse(theRes[index].likers);
        if (arr) {
          if (
            arr.includes(
              JSON.parse(localStorage.getItem("UNI201User")).custom_id
            )
          ) {
            var topic = theRes[index].post_topic;
            var issue_no = theRes[index].issue_number;
            var slug = theRes[index].slug;
            var date = theRes[index].created_at;
          }

          theArr.push({
            topic: topic,
            issue_no: issue_no,
            slug: slug,
            date: date,
          });
        }
      }

      setPosts(theArr);

      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const now = new Date();
  createEffect(() => {
    if (!JSON.parse(localStorage.getItem("UNI201User"))) {
      logOut();
    } else {
      getLikes();
    }
  });
  return (
    <MetaProvider>
      <Title>Liked Lessons | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://uni201.com.ng/" />
      <Meta name="description" content="All Lessons I have liked on UNI201." />
      <div>
        <Header />

        <div class="pt-20 md:pt-24">
          <Show
            when={fetching()}
            fallback={
              <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
                <div class="content sm:w-8/12 md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
                  <div class="bg-white p-2 md:p-6">
                    <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                      <span class="bg-purple-300 p-1">Liked Lessons</span>
                    </h4>

                    <div class="my-4 space-y-6 text-base">
                      <p>Below are all the Lessons you have liked:</p>
                      <Show
                        when={posts.length > 0}
                        fallback={
                          <>
                            <p class="text-gray-400 text-center">
                              You've not liked any lesson yet!
                            </p>
                          </>
                        }
                      >
                        <For each={posts}>
                          {(post, i) => (
                            <p>
                              <span class="block text-black pt-4">
                                Lesson #{post.issue_no}
                              </span>
                              <A
                                href={"/lesson/" + post.issue_no}
                                class="hover:border-b border-black"
                              >
                                {post.topic}
                              </A>
                            </p>
                          )}
                        </For>
                      </Show>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
              <div class="content sm:w-8/12 md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
                {/* loading */}
                <div class="p-2 md:p-6">
                  <Skeleton />
                </div>
                {/* loading */}
              </div>
            </div>
          </Show>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Likes;
