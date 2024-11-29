import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import notFound from "../assets/404.jpg";

function NotFound() {
  return (
    <MetaProvider>
      <Title>Not Found | www.techinjos.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Your #1 Weekly Newsletter focused on the Tech Ecosystem in Jos, Plateau state!"
      />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">Not Found</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Oops!
                </h2>
                <div class="space-y-6 text-base">
                  <p>
                    It appears the page or link you are looking forhas been
                    deleted or moved.
                  </p>
                  <p>
                    <A href="/">
                      <img src={notFound} alt="Page not found on techINJos" />
                    </A>
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

export default NotFound;
