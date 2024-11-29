import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Sponsorship() {
  return (
    <MetaProvider>
      <Title>Sponsor Tech in Jos Newsletter - www.techinjos.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Sponsor the #1 Weekly and Quick Brief for Jos' Tech Ecosystem!"
      />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-fuchsia-300 p-1">Sponsor us</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Reach the Heart of Jos' Tech Ecosystem
                </h2>
                <div class="space-y-6 text-base">
                  <p>
                    When you sponsor techINJos, you will connect directly with
                    the innovators, tech entrepreneurs, learners, tech
                    enthusiast and tech professionals driving the fast growing
                    tech ecosystem in Jos.
                  </p>
                  <p>Why you should advertise with us:</p>
                  <ul class="">
                    <li>
                      <b>Targeted Audience:</b>
                      <br />
                      Reach a highly engaged audience of tech enthusiasts,
                      startups, and industry leaders in Jos.
                    </li>
                    <li>
                      <b>Credibility:</b>
                      <br />
                      Associate your brand with the number 1 source of tech news
                      and insights in Jos.
                    </li>
                  </ul>
                  <p>
                    Ready to reach the tech community in Jos? Contact the editor
                    via WhatsApp{" "}
                    <a href="https://wa.me/23408092772909">08092772909</a> for a
                    proposal and other details.
                  </p>
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

export default Sponsorship;
