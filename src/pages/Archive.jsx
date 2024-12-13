import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import whatsappShare from "../../src/assets/whatsapp.png";
import twitterShare from "../../src/assets/x.png";
import ShareButton from "../components/ShareButton";

function Archive() {
  return (
    <MetaProvider>
      <Title>Archive | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="Archive of Posts on UNI201." />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-blue-300 p-1">Archive</span>
                </h2>
                <h2 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                  See all Posts
                </h2>
                <div class="my-4 space-y-6 text-base">
                  <p class="text-gray-400">No results found</p>
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

export default Archive;
