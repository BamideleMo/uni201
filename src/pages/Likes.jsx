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
        if (
          arr.includes(JSON.parse(localStorage.getItem("UNI201User")).custom_id)
        ) {
          // obj["liked"] = [
          //   theRes[index].post_topic,
          //   theRes[index].issue_number,
          //   theRes[index].slug,
          //   theRes[index].created_at,
          // ];
          // var arrObj = {};
          // arrObj[] = {
          var topic = theRes[index].post_topic;
          var issue_no = theRes[index].issue_number;
          var slug = theRes[index].slug;
          var date = theRes[index].created_at;
          // };
        }
      }
      theArr.push({ topic: topic, issue_no: issue_no, slug: slug, date: date });
      console.log(theArr);
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
      <Title>Liked Posts | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="All posts I have liked on UNI201." />
      <div>
        <Header />

        <div class="pt-24 md:pt-28">
          <Show
            when={fetching()}
            fallback={
              <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
                <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
                  <div class="bg-white p-2 md:p-6">
                    <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                      <span class="bg-purple-300 p-1">My Liked Posts</span>
                    </h2>
                    <h2 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                      Saved for Easy Access
                    </h2>
                    <div class="my-4 space-y-6 text-base">
                      <For each={posts}>
                        {(post, i) => (
                          <p>
                            <span class="block text-gray-500 text-xs border-t pt-4">
                              {new Date(post.date).toDateString()}
                            </span>
                            <A
                              href={"/post/" + post.issue_no + "/" + post.slug}
                              class="hover:border-b border-black"
                            >
                              {post.topic}
                            </A>
                          </p>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
              <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
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
