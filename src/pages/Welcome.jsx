import { useSearchParams } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CodeVerificationForm from "../components/CodeVerificationForm";
import { createSignal, createEffect } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Welcome() {
  const navigate = useNavigate();

  const getLatest = async () => {
    const response = await fetch(VITE_API_URL + "/api/latest-post", {
      mode: "cors",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("UNI201User")).token
        }`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await response.json();
    if (result.success) {
      navigate("/lesson/" + result.response[0].issue_number, {
        replace: true,
      });
    }
  };

  createEffect(() => {
    if (!JSON.parse(localStorage.getItem("UNI201User"))) {
      navigate("/", {
        replace: true,
      });
    }
  });
  return (
    <MetaProvider>
      <Title>Welcome to UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://uni201.com.ng/" />
      <Meta name="description" content="Welcome to UNI201" />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-blue-400 p-1">Finally.. .</span>
                </h4>
                <h4 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Welcome to UNI201 🎉
                </h4>
                <div class="space-y-6 text-base">
                  <p>
                    Thrilled to have you join this vibrant community of
                    forward-thinking Nigerian students who are embracing
                    entrepreneurship to shape their futures.
                  </p>
                  <p>
                    Your time in Uni is the perfect opportunity to lay the
                    foundation for a brighter, independent future. By taking
                    small steps now, you’ll be miles ahead after graduation!
                  </p>
                  <p>
                    <b>Here’s what you will get:</b>
                  </p>
                  <ul class="mx-4 space-y-4">
                    <li>
                      <u>Inspiring Lessons:</u> Every Tuesday and Thursday
                      morning, you’ll get practical tips and strategies tailored
                      to help you embrace student entrepreneurship so that you
                      can easily avoid unemployment after you graduate.
                    </li>
                    <li>
                      <u>Exclusive Stories:</u> You'll learn from real-life case
                      studies of students just like you who turned their
                      entrepreneurial ideas into success stories.
                    </li>
                  </ul>
                  <p>
                    <b>3 things you should do now:</b>
                  </p>
                  <ul class="mx-4 space-y-4">
                    <li>
                      <u>Make up your mind:</u> to always come to this website{" "}
                      <b>every Tuesday and Thursday morning</b> to get fresh
                      lessons.
                    </li>
                    <li>
                      <u>Tell your Friends:</u> Great things are better when
                      shared! Tell your friends to join UNI201 and build a
                      circle of like-minded student entrepreneurs.
                    </li>
                    <li>
                      <u>Start from Lesson #1:</u> Start reading from lesson #1
                      up until the latest lesson. You will learn so much I
                      promise you.
                      <br />
                      <A
                        href="https://uni201.com.ng/lesson/1"
                        class="text-cyan-700 hover:opacity-60"
                      >
                        Click here to start
                      </A>
                      .
                    </li>
                  </ul>
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

export default Welcome;
