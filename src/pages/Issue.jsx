import { A, useParams, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { createSignal, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import whatsappShare from "../assets/whatsapp.png";
import twitterShare from "../assets/x.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";
import Popup from "../components/Popup";
import ShareButton from "../components/ShareButton";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Issue() {
  const [popup, setPopup] = createSignal(true);

  const navigate = useNavigate();

  const params = useParams();
  const [issue, setIssue] = createStore([]);
  const [metaDesc, setMetaDesc] = createSignal("Loading...");
  const [topic, setTopic] = createSignal("");

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
      setTopic(result.response[0].post_topic);
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
          "&i=Xqwertyasdf1234098765Z",
        { replace: true }
      );
    }
  };

  const [resource] = createResource(issueDetails);
  return (
    <MetaProvider>
      <Title>
        {params.issueNumber && topic() !== ""
          ? "Post #" +
            params.issueNumber +
            " - " +
            topic() +
            " : www.uni201.com.ng"
          : "Loading.. . "}
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

        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-0 md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto">
              <Show
                when={resource.loading}
                fallback={
                  <>
                    <For each={resource().issue}>
                      {(post, i) => (
                        <>
                          <div class="bg-white p-2 md:p-6">
                            <h2 class="text-base md:text-xl border-b-2 border-black pb-2">
                              <span class={post.post_bg + " " + "p-1"}>
                                {post.post_highlight}
                              </span>
                            </h2>
                            <h1 class="my-4 text-xl md:text-3xl !leading-tight font-bold">
                              {post.post_topic}
                            </h1>
                            <div class="flex text-gray-400 pb-6 space-x-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                />
                              </svg>
                              <span class="mt-0.5">
                                {new Date(post.created_at).toDateString()}
                              </span>
                            </div>
                            <div
                              class="space-y-6 text-base"
                              innerHTML={post.conversation_text}
                            ></div>
                          </div>
                          <div class="mb-12 m-2 md:m-6 py-2 text-xs md:text-base lg:text-lg">
                            <div class="shares w-full md:w-full mx-auto flex justify-between space-x-2 lg:space-x-2">
                              <span class="flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded">
                                <span class="pt-0.5">Like this</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                  />
                                </svg>
                              </span>
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
                                class="flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
                              >
                                <div class="">Share on</div>
                                <div class="-ml-1">
                                  <img
                                    src={twitterShare}
                                    alt="share on twitter"
                                    class="w-8 py-1.5"
                                  />
                                </div>
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
                                class="flex justify-between items-center space-x-2 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
                              >
                                <div class="">Share on</div>
                                <div class="">
                                  <img
                                    src={whatsappShare}
                                    alt="share on WhatsApp"
                                    class="w-6 py-1.5"
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                    </For>

                    <div class="m-2 md:m-6 flex justify-between border-t-2 border-black">
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

                    <div class="my-12 bg-white p-2 md:p-6">
                      <h2 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-green-300 p-1">Share UNI201</span>
                      </h2>
                      <div class="space-y-6 text-base my-2">
                        <p>
                          You currently have <b>0</b> referrals.
                        </p>
                        <p>
                          Tell other students to join UNI201 by clicking the
                          button below to share on your WhatsApp:
                        </p>
                        <p>
                          {/* <span
                            target="_blank"
                            href={
                              "https://wa.me/?text=" +
                              encodeURI(
                                "I like UNI201, and I think you'd like it too. It's a weekly post focused on helping Nigerian students in universities embrace and pursue entrepreneurship before graduation. Check it out: https://uni201.com.ng?ref=" +
                                  JSON.parse(localStorage.getItem("UNI201User"))
                                    .custom_id
                              )
                            }
                            class="bg-slate-100 p-2 rounded-lg border cursor-pointer hover:opacity-60"
                          >
                            👋🏾 Share on WhatsApp
                          </span> */}
                          <ShareButton
                            CId={
                              JSON.parse(localStorage.getItem("UNI201User"))
                                .custom_id
                            }
                          />
                        </p>
                        <p>
                          Or copy and paste your referral link to others:
                          <br />
                          <span class="text-cyan-600">
                            https://www.uni201.com.ng?ref=
                            {
                              JSON.parse(localStorage.getItem("UNI201User"))
                                .custom_id
                            }
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* <div class="bg-white p-2 md:p-6">
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
                          <b>next Friday evening</b>. See you then!
                        </p>
                      </div>
                    </div> */}
                  </>
                }
              >
                {/* loading */}
                <div class="p-2 md:p-6">
                  <Skeleton />
                </div>
                {/* loading */}
              </Show>
              {/* fetched ends here */}
              {/* <div class="py-16 md:py-20 md:px-14 lg:px-10 md:pb-10 text-center space-y-4">
                <div class="flex justify-center space-x-6">
                  <a
                    href="https://whatsapp.com/channel/0029Vaygmz06hENx0xLBxS2m"
                    class="hover:opacity-60"
                    target="_blank"
                  >
                    <img
                      src={whatsappChannel}
                      alt="UNI201 WhatsApp Channel"
                      class="rounded-full w-14"
                    />
                  </a>
                </div>
                <div class="p-0 text-base">
                  <A href="https://uni201.com.ng" class="name">
                    UNI201
                  </A>{" "}
                  is a weekly post focused on helping university students in
                  Nigeria embrace and pursue student entrepreneurship.
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Issue;
