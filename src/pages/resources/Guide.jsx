import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { createSignal } from "solid-js";

function Guide() {
  const [showAuthor, setShowAuthor] = createSignal(false);
  return (
    <MetaProvider>
      <Title>
        The Nigerian University Student Guide to Find and Start a Business on
        Campus in 4 Days! - www.uni201.com.ng
      </Title>
      <Link rel="canonical" href="https://uni201.com.ng/" />
      <Meta
        name="description"
        content="The Nigerian University Student Guide to Find and Start a Business on Campus in 4 Days!"
      />
      <div>
        <Header />
        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content sm:w-8/12 md:w-10/12 lg:w-6/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h1 class="font-normal text-2xl md:text-3xl text-center leading-snug">
                  The Nigerian University Student Guide to{" "}
                  <b class="border-b-2 border-red-600">
                    Find and Start a Business on Campus in 4 Days
                  </b>
                  !
                </h1>
                <div class="my-12 space-y-6 text-base">
                  <p>
                    Would you like to start a profitable business on Campus?
                  </p>
                  <p>
                    Do you wish to enjoy the tremendous benefits that come with
                    student entrepreneurship?
                  </p>
                  <p>
                    Join the next cohort of "The Nigerian University Student
                    Guide to Find and Start a Business on Campus in 4 Days!"
                  </p>
                  <p>
                    This is a mini-course with No fluff, no unnecessary stories.
                    But an open book to real-life experiences of 2 people who
                    found and did profitable businesses as uni students.
                  </p>
                  <p>
                    At the end of this mini-course, you’ll have practical
                    know-how and will be very able to start a profitable
                    business ASAP!
                  </p>
                  <div class="bg-cyan-50 space-y-4 border-4 border-cyan-700 p-4 rounded-xl">
                    <p>
                      <b>What You'll Get:</b>
                    </p>
                    <p>
                      You’ll get only in-depth lessons on how to find and start
                      a business on campus in 4 days drawing from real-life
                      experiences.
                    </p>
                    <p>
                      <b>✅ Day #1:</b>
                      <br />
                      An in-depth analysis of a real-life example of a
                      profitable business that happened on campus and key
                      lessons you can apply from its success;
                    </p>
                    <p>
                      <b>✅ Day #2:</b>
                      <br />
                      Another in-depth analysis of a real-life example of a
                      profitable business that happened on campus and key
                      lessons you can apply from its success;
                    </p>
                    <p>
                      <b>✅ Day #3:</b>
                      <br />
                      Steps to find a "CONVENIENT" and profitable business for a
                      university student;
                    </p>
                    <p>
                      <b>✅ Day #4:</b>
                      <br />
                      Mapping out workable plans, and strategy for execution.
                    </p>
                  </div>
                  <p>So...</p>
                  <p>
                    If you don't want to waste time. If you'll like to have an
                    innovative or smart business idea that's also profitable,
                    then this is for you.
                  </p>
                  <p>
                    <b>How much?</b>
                  </p>
                  <p>
                    <span class="text-red-600">₦1,500</span> only!
                  </p>
                  <p>
                    <u>The next cohort starts on:</u> 1st April, 2025.
                  </p>
                  <p>
                    🚀 <b>Ps:</b>
                  </p>
                  <p>Hurry!</p>
                  <p>Only 100 slots available. And people are registering!</p>
                  <p>
                    Registration closes once all slots are filled or by March
                    30, 2025—whichever comes first!
                  </p>
                  <p>
                    <b>How to register</b>
                  </p>
                  <ul>
                    <li>
                      <u>Step 1:</u>
                      <br />
                      Pay ₦1,500 only to this Opay account: <b>7036935026</b>
                    </li>
                    <li>
                      <u>Step 2:</u>
                      <br />
                      Screenshot & send proof of payment via WhatsApp to:{" "}
                      <a
                        class="border-b border-cyan-600 hover:opacity-60"
                        href="https://wa.me/2348124802798?text=I%20have%20paid%201,500%20for%20the%20mini-course."
                      >
                        08124802798
                      </a>
                    </li>
                  </ul>
                  <p>
                    <i>
                      <b>Register Now</b> Because There Are Limited Spots
                      Available At The Current Price!
                    </i>
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

export default Guide;
