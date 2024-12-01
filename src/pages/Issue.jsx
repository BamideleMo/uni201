import { A, useParams, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { createSignal, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import facebook from "../../src/assets/facebook.png";
import twitter from "../../src/assets/twitterx.png";
import whatsappShare from "../../src/assets/whatsapp.png";
import twitterShare from "../../src/assets/x.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";
import Popup from "../components/Popup";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Issue() {
  const [popup, setPopup] = createSignal(true);

  const navigate = useNavigate();

  const params = useParams();
  const [issue, setIssue] = createStore([]);
  const [metaDesc, setMetaDesc] = createSignal("Loading...");

  const issueDetails = async () => {
    if (JSON.parse(localStorage.getItem("UNI201User"))) {
      setPopup(false);

      await getUser();
    }

    const response = await fetch(
      VITE_API_URL + "/open/view-posts/" + params.issueNumber,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const result = await response.json();
    if (result.success) {
      await getPrevIssue();
      await getNextIssue();
      setIssue(result.response);
      setMetaDesc(result.response[0].shareable);
    }

    return {
      issue,
    };
  };

  const [nextIssue, setNextIssue] = createSignal(false);
  const [nextSlug, setNextSlug] = createSignal(false);
  const getNextIssue = async () => {
    var v = parseInt(params.issueNumber) + 1;
    const response = await fetch(VITE_API_URL + "/open/view-posts/" + v, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await response.json();
    if (result.response.length > 0) {
      setNextIssue(true);
      setNextSlug(result.response[0].slug);
    }
  };

  const [prevIssue, setPrevIssue] = createSignal(false);
  const [prevSlug, setPrevSlug] = createSignal(false);
  const getPrevIssue = async () => {
    var v = parseInt(params.issueNumber) - 1;
    const response = await fetch(VITE_API_URL + "/open/view-posts/" + v, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await response.json();
    if (result.response.length > 0) {
      setPrevIssue(true);
      setPrevSlug(result.response[0].slug);
    }
  };

  const getUser = async () => {
    const response = await fetch(
      VITE_API_URL +
        "/api/user/" +
        JSON.parse(localStorage.getItem("UNI201User")).custom_id,
      {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("UNI201User")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const result = await response.json();
    if (result.response.status === "unconfirmed") {
      navigate(
        "/confirm-email?e=" +
          JSON.parse(localStorage.getItem("UNI201User")).email +
          "&i=",
        { replace: true }
      );
    }
  };

  const [resource] = createResource(issueDetails);
  return (
    <MetaProvider>
      <Title>
        UNI201 Post{" "}
        {params.issueNumber
          ? "#" + params.issueNumber + " - www.uni201.com.ng"
          : "Loading... "}
      </Title>
      <Meta
        name="description"
        content={metaDesc() ? metaDesc() : "Loading..."}
      />
      <div>
        <Show when={popup()}>
          <Popup whichForm={"sign in"} whichIssue={params.issueNumber} />
        </Show>
        <Header />

        <div class="pt-20 md:pt-24">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-0 md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto">
              <Show
                when={resource.loading}
                fallback={
                  <>
                    <For each={resource().issue}>
                      {(post, i) => (
                        <>
                          <div class="bg-white px-2 md:px-6">
                            <h2 class="text-base md:text-xl border-b-2 border-black pb-2">
                              <span class={post.post_bg + " " + "p-1"}>
                                {post.post_highlight}
                              </span>
                            </h2>
                            <h1 class="my-4 text-xl md:text-2xl !leading-tight font-bold">
                              {post.post_topic}
                            </h1>
                            <div
                              class="space-y-6 text-base"
                              innerHTML={post.conversation_text}
                            ></div>
                          </div>
                          <div
                            class="mb-12 border-t border-gray-200 bg-white 
                          px-2 md:px-6 py-4 text-xs flex justify-between"
                          >
                            <div></div>
                            <div class="shares flex space-x-4">
                              <a
                                target="_blank"
                                href={
                                  "https://twitter.com/intent/tweet?text=" +
                                  encodeURI(
                                    post.shareable +
                                      " 🤖 https://uni201.com.ng/post/" +
                                      post.slug
                                  )
                                }
                                class="flex items-center space-x-1 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
                              >
                                <div class="-ml-1">
                                  <img
                                    src={twitterShare}
                                    alt="share on twitter"
                                    class="w-8 py-1.5"
                                  />
                                </div>
                                <div class="">Share on X</div>
                              </a>
                              <a
                                target="_blank"
                                href={
                                  "https://wa.me/?text=" +
                                  encodeURI(
                                    post.shareable +
                                      " 🤖 https://uni201.com.ng/post/" +
                                      post.slug
                                  )
                                }
                                class="flex items-center space-x-1 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
                              >
                                <div class="">
                                  <img
                                    src={whatsappShare}
                                    alt="share on WhatsApp"
                                    class="w-6 py-1.5"
                                  />
                                </div>
                                <div class="">Share on WhatsApp</div>
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                    </For>

                    <div class="mb-12 bg-white p-2 md:p-6">
                      <div class="rounded-lg border-2 border-dashed border-blue-600 p-4 space-y-6">
                        <p>
                          <span
                            class="text-base md:text-xl 
                          text-blue-700 bg-white p-1"
                          >
                            👋🏾 Are you on WhatsApp?
                          </span>
                        </p>
                        <p class="">
                          <b>Join our WhatsApp Channel</b> & never get to miss
                          any Post.
                        </p>
                        <p class="pb-3">
                          <a
                            href="https://whatsapp.com/channel/0029VaEVLBHBfxoG5GZxz72v"
                            target="_blank"
                            class="bg-blue-700 text-xs p-3 rounded hover:opacity-60"
                          >
                            <b class="text-white">Join now</b>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div class="mb-12 bg-white p-2 md:p-6">
                      <h2 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-orange-300 p-1">Share UNI201</span>
                      </h2>
                      <h1 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                        💪🏾 <b>Help us grow</b>.
                      </h1>
                      <div class="space-y-6 text-base">
                        <p>
                          Tell a friend about UNI201 -{" "}
                          <a
                            target="_blank"
                            href={
                              "https://wa.me/?text=" +
                              encodeURI(
                                "I've enjoyed reading UNI201, and I think you'd enjoy it too. It's a weekly post focused on helping Nigerian students in Nigerian Universities embrace and pursue entrepreneurship before graduation. Check it out: https://uni201.com.ng"
                              )
                            }
                          >
                            send him/her a WhatsApp chat
                          </a>
                          .
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Funi201.com.ng%2F&amp;src=sdkpreparse"
                            class="fb-xfbml-parse-ignore"
                          >
                            Share UNI201
                          </a>{" "}
                          on Facebook.
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href={
                              "https://twitter.com/intent/tweet?text=" +
                              encodeURI(
                                "Check out UNI201 @UNI201_NG for tips and ideas on student entrepreneurship focused on Nigerian Uni students. 🤖 https://uni201.com.ng"
                              )
                            }
                          >
                            Share UNI201
                          </a>{" "}
                          on X (formerly Twitter).
                        </p>
                      </div>
                    </div>

                    <div class="bg-white p-2 md:p-6">
                      <h2 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-blue-300 p-1">
                          Send us your Feedback
                        </span>
                      </h2>
                      <h1 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                        Your feedback is invaluable.
                      </h1>
                      <div class="space-y-6 text-base">
                        <p>
                          Whether you have ideas or tips you'd like us to post
                          next, a suggestion, a comment, or a concern, we want
                          to hear from you. Send email now to{" "}
                          <a href="mailto:contactUNI201@gmail.com" class="name">
                            contactUNI201@gmail.com
                          </a>
                        </p>
                        <p>
                          <b>Remember:</b>
                          <br /> We'll post another idea or tip{" "}
                          <b>next Saturday morning</b>. See you then!
                        </p>
                      </div>
                    </div>
                  </>
                }
              >
                {/* loading */}
                <Skeleton />
                {/* loading */}
              </Show>
              {/* fetched ends here */}
              <div class="py-16 md:py-20 md:px-14 lg:px-10 md:pb-10 text-center space-y-4">
                <div class="flex justify-center space-x-6">
                  <a
                    href="https://www.facebook.com/UNI201_NG"
                    class="hover:opacity-60"
                    target="_blank"
                  >
                    <img
                      src={facebook}
                      alt="UNI201 Facebook page"
                      class="rounded-full h-10"
                    />
                  </a>
                  <a
                    href="https://www.x.com/UNI201_NG"
                    class="hover:opacity-60"
                    target="_blank"
                  >
                    <img
                      src={twitter}
                      alt="UNI201 X page"
                      class="rounded-full h-10"
                    />
                  </a>
                </div>
                <div class="p-4 text-base">
                  <A href="https://uni201.com.ng" class="name">
                    UNI201
                  </A>{" "}
                  is focused on helping Nigerian students in
                  Nigerian universities embrace and pursue entrepreneurship
                  before graduation.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-11/12 mx-auto my-10 py-4 flex justify-between border-t border-black">
          <Show when={prevIssue()} fallback={<div>.</div>}>
            <span
              onClick={() => {
                window.location.replace(
                  "/post/" + (parseInt(params.issueNumber) - 1)
                );
              }}
              class="flex space-x-1 cursor-pointer hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>PREVIOUS</span>
            </span>
          </Show>
          <Show when={nextIssue()} fallback={<div>.</div>}>
            <span
              onClick={() => {
                window.location.replace(
                  "/post/" + (parseInt(params.issueNumber) + 1)
                );
              }}
              class="flex space-x-1 cursor-pointer hover:text-red-600"
            >
              <span>NEXT</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </Show>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Issue;
