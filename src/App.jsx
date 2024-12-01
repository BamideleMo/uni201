import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import { createSignal, createEffect, Show } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Why from "./components/Why";
import Cta from "./components/Cta";
import Skeleton from "./components/Skeleton";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function App() {
  const navigate = useNavigate();

  const [fetching, setFetching] = createSignal(false);

  const latestIssue = async () => {
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
        navigate("/post/" + result.response[0].issue_number, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  createEffect(() => {
    if (JSON.parse(localStorage.getItem("UNI201User"))) {
      setFetching(true);
      latestIssue();
    }
  });
  return (
    <MetaProvider>
      <Title>UNI201 - Empower Your Future | www.uni201.com.ng</Title>
      <Meta
        name="description"
        content="Empower Your Future: Become a Successful Student Entrepreneur in a Nigerian University!"
      ></Meta>
      <Link rel="preload" as="image" href={screen}></Link>
      <Header />
      <div class="pt-20 md:pt-24">
        <Show
          when={fetching()}
          fallback={
            <>
              <Hero />
              <Why />
              <Cta />
            </>
          }
        >
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-0 md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto">
              {/* loading */}
              <Skeleton />
              {/* loading */}
            </div>
          </div>
        </Show>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default App;
