import { A, useNavigate } from "@solidjs/router";
import { createSignal, createEffect, Show } from "solid-js";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";

function Likes() {
  const navigate = useNavigate();

  const [fetching, setFetching] = createSignal(true);

  const logOut = () => {
    localStorage.removeItem("UNI201User");
    window.location.replace("/");
  };

  const now = new Date();
  createEffect(() => {
    if (!JSON.parse(localStorage.getItem("UNI201User"))) {
      logOut();
    } else {
      setFetching(false);
    }
  });
  return (
    <MetaProvider>
      <Title>My UNI201 likes | www.uni201.com.ng</Title>
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
                      <span class="bg-yellow-300 p-1">My Liked Posts</span>
                    </h2>
                    <h2 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                      All the Posts I've Liked!
                    </h2>
                    <div class="my-4 space-y-6 text-base">
                      <p class="text-gray-400">No results found</p>
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
