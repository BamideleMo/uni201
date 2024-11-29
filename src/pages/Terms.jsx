import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import techINJos from "../assets/about-techINJos.png";

function Terms() {
  return (
    <MetaProvider>
      <Title>Terms | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="Terms of use" />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">Terms of Use</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Important!
                </h2>
                <div class="space-y-6 text-base">
                  <p>...</p>
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

export default Terms;
