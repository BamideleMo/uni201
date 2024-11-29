import { A, useParams } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { createResource } from "solid-js";
import { createStore } from "solid-js/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skeleton2 from "../components/Skeleton2";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Archive() {
  const [issue, setIssue] = createStore([]);

  const allIssues = async () => {
    const response = await fetch(VITE_API_URL + "/open/meta/view-issues", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await response.json();
    if (result.success) {
      setIssue(result.response);
    }

    return {
      issue,
    };
  };

  const [resource] = createResource(allIssues);
  return (
    <MetaProvider>
      <Title>Archive - Tech in Jos Newsletter</Title>
      <Meta
        name="description"
        content="All Issues on techINJos; the #1 weekly Newsletter about the Tech Ecosystem in Jos, Plateau state!"
      />
      <div>
        <Header />
        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto backgound-color pt-0 md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-blue-300 p-1">Archive</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Explore Our Archives
                </h2>
                <p class="text-sm">
                  Browse past issues to discover valuable insights, trends, and
                  information. Our archives contain a wealth of knowledge and
                  experiences, for your convenience.
                </p>
              </div>
              <div class="my-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Show
                  when={resource.loading}
                  fallback={
                    <>
                      <For each={resource().issue}>
                        {(post, i) => (
                          <div class=" bg-white p-2 sm:p-6">
                            <div class="grid grid-cols-2 sm:grid-cols-1 gap-1">
                              <div>
                                <img
                                  src={post.url}
                                  alt={"Image: Issue # " + post.issue_number}
                                  class="rounded-lg"
                                />
                              </div>
                              <div>
                                <div class="sm:my-1 font-semibold text-red-600 text-sm">
                                  Newsletter #{post.issue_number}
                                </div>
                                <div class="text-sm md:text-base leading-tight font-bold">
                                  <A
                                    href={"/newsletter/" + post.issue_number+"/"+ post.seo_link}
                                    class="text-gray-800 hover:border-b border-red-600"
                                  >
                                    {post.description}
                                  </A>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </For>
                    </>
                  }
                >
                  {/* loading */}
                  <div class="bg-white col-span-2 p-4">
                    <Skeleton2 />
                  </div>
                  {/* loading */}
                </Show>
              </div>
              {/* fetched ends here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Archive;
