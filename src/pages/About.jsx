import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import whatsappShare from "../../src/assets/whatsapp.png";
import twitterShare from "../../src/assets/x.png";
import ShareButton from "../components/ShareButton";

function About() {
  return (
    <MetaProvider>
      <Title>About UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Empower Your Future: Become a Successful Student Entrepreneur in a Nigerian University!"
      />
      <div>
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
                    If you're a student in a Nigerian university, you're in the
                    right place.
                  </p>
                  <p>
                    <b>UNI201</b> is focused on helping students in Nigerian
                    universities embrace and pursue entrepreneurship before
                    graduation.
                  </p>
                  <p>
                    <b>Because</b>, one of the ways to avoid unemployment and
                    unemployability bedeviling too many university graduates in
                    Nigeria is to embrace student entrepreneurship.
                  </p>
                  <p>So...</p>
                  <p>
                    <b>Every Saturday morning</b>, I post educative and
                    impactful ideas & tips that will help you embrace student
                    entrepreneurship, learn how to become a successful student
                    entrepreneur, become employable, and avoid unemployment
                    after you graduate.
                  </p>
                  <p>
                    <b>And this isn’t just about theory</b>—it's about real-life
                    experiences & case studies of students who took the leap. No
                    fluff, & no jargon—just relatable experiences with lessons
                    you can use to start your own journey and empower your
                    future.
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
