import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import { createSignal, createEffect } from "solid-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import screen from "./assets/techINJos-mobile-screen.png";
import Hero from "./components/Hero";
import Why from "./components/Why";
import Cta from "./components/Cta";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function App() {
  const navigate = useNavigate();

  // createEffect(() => {
  //   if (JSON.parse(localStorage.getItem("UNI201User"))) {
  //     navigate("/post", { replace: true });
  //   }
  // });
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
        <Hero />
        <Why />
        <Cta />
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default App;
