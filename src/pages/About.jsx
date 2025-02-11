import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createSignal } from "solid-js";
import Bamidele from "../components/Bamidele";

function About() {
  const [showAuthor, setShowAuthor] = createSignal(false);
  return (
    <MetaProvider>
      <Title>About UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Empower Your Future: Become a Successful Student Entrepreneur in a Nigerian University!"
      />
      <div>
        <Show when={showAuthor()}>
          <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
            <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
              <h2 class="flex justify-between mb-3 border-b pb-3">
                <span>Hi. Bamidele here.</span>
                <span
                  onClick={() => setShowAuthor(false)}
                  class="text-cyan-700 cursor-pointer hover:opacity-60"
                >
                  Close
                </span>
              </h2>
              <div>
                <Bamidele />
              </div>
            </div>
          </div>
        </Show>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">About</span>
                </h4>
                <h4 class="mt-8 text-xl md:text-2xl leading-tight font-bold">
                  Empower Your Future!
                </h4>
                <div class="my-4 space-y-6 text-base">
                  <p>
                    Welcome to UNI201 (
                    <a href="https://uni201.com.ng">www.uni201.com.ng</a>).
                  </p>
                  <p>
                    If you're a student in a Nigerian university, this website
                    is for you.
                  </p>
                  <p>
                    <b>UNI201</b> is a membership website focused on helping students in Nigerian
                    universities embrace and pursue student entrepreneurship.
                  </p>
                  <p>
                    Because one <b>SURE WAY</b> to avoid unemployment after you
                    graduate is to embrace student entrepreneurship now.
                  </p>
                  <p>So...</p>
                  <p>
                    Every <b>Tuesday</b> & <b>Thursday</b> morning you'll get
                    educative and impactful lessons that will help you to:
                  </p>
                  <ul class="list-decimal mx-4 md:mx-6">
                    <li>Embrace student entrepreneurship,</li>
                    <li>
                      Learn how to become a successful student entrepreneur,
                    </li>
                    <li>Become employable,</li>
                    <li>and avoid unemployment after you graduate.</li>
                  </ul>
                  <p>
                    <b>And this isn’t just about theory</b>—it's about real-life
                    experiences & case studies of students who took the leap. No
                    fluff, & no jargon—just straight to the point & relatable
                    experiences with lessons you can use to start your journey
                    and empower your future.
                  </p>
                  <p>
                    Cheers to a brighter future!
                    {/* <br />
                    <span
                      onClick={() => setShowAuthor(true)}
                      class="text-cyan-700 hover:opacity-60 cursor-pointer"
                    >
                      Bamidele M. O
                    </span> */}
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

export default About;
