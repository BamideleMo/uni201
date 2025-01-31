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
import Bamidele from "../components/Bamidele";
import TextArea from "./TextArea";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";

const schema = z.object({
  comment: z.string().min(1, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Issue() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const [popup, setPopup] = createSignal(true);

  const navigate = useNavigate();

  const params = useParams();
  const [issue, setIssue] = createStore([]);
  const [metaDesc, setMetaDesc] = createSignal("Loading...");
  const [topic, setTopic] = createSignal("");
  const [likers, setLikers] = createStore([]);
  const [showAuthor, setShowAuthor] = createSignal(false);
  const [liking, setLiking] = createSignal(false);
  const [likedThis, setLikedThis] = createSignal(false);
  const [likedNow, setLikedNow] = createSignal(false);
  const [copiedRefLink, setCopiedRefLink] = createSignal(false);
  const [referrals, setReferrals] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [comments, setComments] = createStore([]);

  const issueDetails = async () => {
    if (JSON.parse(localStorage.getItem("UNI201User"))) {
      setPopup(false);

      await getUser();
      await getReferrals();
      await getComments();
    }

    const response = await fetch(
      VITE_API_URL + "/api/post/" + params.issueNumber,
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
    if (result.success) {
      await getPrevIssue();
      await getNextIssue();

      setTopic(result.response.post_topic);
      if (result.response.likers) {
        setLikers(JSON.parse(result.response.likers));
        var liked = checkIfLiked(
          JSON.parse(localStorage.getItem("UNI201User")).custom_id
        );
        if (liked) {
          setLikedThis(true);
        }
      }
      setIssue(result.response);
      setMetaDesc(result.response.shareable);
    }
    if (result.response === "Expired token") {
      logOut();
    }

    return {
      issue,
    };
  };

  const [nextIssue, setNextIssue] = createSignal(false);
  const [nextSlug, setNextSlug] = createSignal(false);
  const getNextIssue = async () => {
    var v = parseInt(params.issueNumber) + 1;
    const response = await fetch(VITE_API_URL + "/api/post/" + v, {
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
    if (result.response) {
      setNextIssue(true);
      setNextSlug(result.response.slug);
    }
  };

  const [prevIssue, setPrevIssue] = createSignal(false);
  const [prevSlug, setPrevSlug] = createSignal(false);
  const getPrevIssue = async () => {
    var v = parseInt(params.issueNumber) - 1;
    const response = await fetch(VITE_API_URL + "/api/post/" + v, {
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
    if (result.response) {
      setPrevIssue(true);
      setPrevSlug(result.response.slug);
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

  const getReferrals = async () => {
    const response = await fetch(
      VITE_API_URL +
        "/api/referrals/" +
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
    setReferrals(result.response);
  };

  var arr = [];
  const doLike = async (issue) => {
    setLiking(true);
    if (likers.length === 0) {
      arr.push(JSON.parse(localStorage.getItem("UNI201User")).custom_id);
    } else {
      var likersArray = Object.keys(likers).map((key) => likers[key]);
      for (let index = 0; index < likersArray.length; index++) {
        var liked = checkIfLiked(
          JSON.parse(localStorage.getItem("UNI201User")).custom_id
        );
        if (liked) {
          console.log("exist");
        } else {
          arr.push(likersArray[index]);
        }
      }
      arr.push(JSON.parse(localStorage.getItem("UNI201User")).custom_id);
    }

    try {
      const response = await fetch(VITE_API_URL + "/api/edit-post/" + issue, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("UNI201User")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          likers: JSON.stringify(arr),
        }),
      });
      const result = await response.json();
      setLiking(false);
      setLikedNow(true);
      setLikedThis(true);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfLiked = (val) => {
    var likersArray = Object.keys(likers).map((key) => likers[key]);
    if (likersArray.includes(val)) {
      return true;
    } else {
      return false;
    }
  };

  const copyRefLink = () => {
    var copyText = document.getElementById("myRefLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    setCopiedRefLink(true);
  };

  const getComments = async () => {
    const response = await fetch(
      VITE_API_URL + "/api/view-comments?lesson_num=" + params.issueNumber,
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
    setComments(result.response);
  };

  const logOut = () => {
    localStorage.removeItem("UNI201User");
    window.location.replace("/");
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch(VITE_API_URL + "/api/create-comment", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user: JSON.parse(localStorage.getItem("UNI201User")).id,
          comment: formData().comment.replace(/(\r\n|\n|\r)/gm, "<br />"),
          lesson_num: params.issueNumber,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsProcessing(false);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
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
          : "Just a moment.. ."}
      </Title>
      <Meta
        name="description"
        content={metaDesc() ? metaDesc() : "Just a moment.. ."}
      />
      <div>
        <Header />

        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto pt-0 md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto">
              <Show when={showAuthor()}>
                <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
                  <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
                    <h5 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
                      <div>Why Trust Me?</div>
                      <div>
                        <span
                          onClick={() => {
                            setShowAuthor(false);
                          }}
                          class="uppercase text-red-800 hover:opacity-60 cursor-pointer"
                        >
                          Close
                        </span>
                      </div>
                    </h5>
                    <Bamidele />
                  </div>
                </div>
              </Show>
              <Show when={likedNow()}>
                <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
                  <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
                    <h4 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
                      <div>Liked!</div>
                      <div>
                        <span
                          onClick={() => {
                            setLikedNow(false);
                          }}
                          class="uppercase text-red-800 hover:opacity-60 cursor-pointer"
                        >
                          Close
                        </span>
                      </div>
                    </h4>
                    <div class="text-center">
                      <p>You've liked this post.</p>
                      <div class="py-6">
                        <span
                          onClick={() => {
                            setLikedNow(false);
                          }}
                          class="bg-cyan-600 text-white p-2 rounded-lg hover:opacity-60 cursor-pointer"
                        >
                          Okay.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Show>
              <Show when={copiedRefLink()}>
                <div class="z-50 bg-black w-screen h-screen bg-opacity-95 fixed flex items-center top-0 bottom-0 left-0 right-0">
                  <div class="rounded w-11/12 md:w-96 mx-auto text-sm bg-white p-4 border-b-8 border-cyan-600">
                    <h4 class="flex justify-between pb-2 mb-4 border-b-2 border-cyan-600">
                      <div>Copied!</div>
                      <div>
                        <span
                          onClick={() => {
                            setCopiedRefLink(false);
                          }}
                          class="uppercase text-red-800 hover:opacity-60 cursor-pointer"
                        >
                          Close
                        </span>
                      </div>
                    </h4>
                    <div class="text-center">
                      <p>You've copied your referral link.</p>
                      <div class="py-6">
                        <span
                          onClick={() => {
                            setCopiedRefLink(false);
                          }}
                          class="bg-cyan-600 text-white p-2 rounded-lg hover:opacity-60 cursor-pointer"
                        >
                          Okay.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Show>
              <Show when={popup()}>
                <Popup whichForm={"sign in"} whichIssue={params.issueNumber} />
              </Show>
              <Show
                when={resource.loading}
                fallback={
                  <>
                    <div class="bg-white p-2 md:p-6">
                      <h4 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class={resource().issue.post_bg + " " + "p-1"}>
                          {resource().issue.post_highlight}
                        </span>
                      </h4>
                      <h1 class="drop-shadow-lg my-4 text-2xl md:text-3xl !leading-tight font-semibold">
                        {resource().issue.post_topic}
                      </h1>
                      <div class="flex justify-between text-sm pb-8 lg:pb-12">
                        <div class="text-gray-400 flex space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                          >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                          <span class="mt-0.5">
                            {likers.length} Like {likers.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div class="text-gray-400 flex space-x-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                          >
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                          </svg>

                          <span class="flex mt-0.5">13</span>
                        </div>
                      </div>
                      <div
                        class="space-y-6 text-base"
                        innerHTML={resource().issue.conversation_text}
                      ></div>
                    </div>
                    <div class="mb-12 m-2 md:m-6 py-2 text-xs md:text-base lg:text-lg">
                      <div class="shares w-full md:w-full mx-auto flex space-x-2 lg:space-x-12">
                        <Show
                          when={liking()}
                          fallback={
                            <Show
                              when={likedThis()}
                              fallback={
                                <span
                                  onClick={() => {
                                    doLike(resource().issue.issue_number);
                                  }}
                                  class="flex-1 flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 cursor-pointer hover:opacity-60 text-black px-2 rounded"
                                >
                                  <span class="pt-0.5">Like this</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-8 text-red-600"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                  </svg>
                                </span>
                              }
                            >
                              <span class="flex-1 flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 cursor-not-allowed text-black px-2 rounded">
                                <span class="pt-0.5">Liked this</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  class="size-8 text-red-600"
                                >
                                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                              </span>
                            </Show>
                          }
                        >
                          <span class="flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 cursor-not-allowed opacity-60 text-black px-2 rounded">
                            <span class="pt-0.5">Liking.. .</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-8"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </span>
                        </Show>
                        <a
                          target="_blank"
                          href={
                            "https://twitter.com/intent/tweet?text=" +
                            encodeURI(
                              resource().issue.shareable +
                                " 🤖 https://uni201.com.ng/lesson/" +
                                resource().issue.issue_number +
                                "/" +
                                resource().issue.slug
                            )
                          }
                          class="flex-1 flex justify-between items-center space-x-1 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
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
                              resource().issue.shareable +
                                " 🤖 https://uni201.com.ng/lesson/" +
                                resource().issue.issue_number +
                                "/" +
                                resource().issue.slug
                            )
                          }
                          class="flex-1 flex justify-between items-center space-x-2 bg-gray-100 border border-gray-400 hover:opacity-60 text-black px-2 rounded"
                        >
                          <div class="">Share on</div>
                          <div class="">
                            <img
                              src={whatsappShare}
                              alt="share on WhatsApp"
                              class="w-7 py-1.5"
                            />
                          </div>
                        </a>
                      </div>
                    </div>

                    <div class="m-2 md:m-6 pt-12 text-red-600 flex justify-between border-t-2 border-black">
                      <Show when={prevIssue()} fallback={<div>.</div>}>
                        <span
                          onClick={() => {
                            window.location.replace(
                              "/lesson/" +
                                (parseInt(params.issueNumber) - 1) +
                                "/" +
                                prevSlug()
                            );
                          }}
                          class="flex space-x-1 cursor-pointer hover:text-cyan-600"
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
                          <span>PREVIOUS LESSON</span>
                        </span>
                      </Show>
                      <Show when={nextIssue()} fallback={<div>.</div>}>
                        <span
                          onClick={() => {
                            window.location.replace(
                              "/lesson/" +
                                (parseInt(params.issueNumber) + 1) +
                                "/" +
                                nextSlug()
                            );
                          }}
                          class="flex space-x-1 cursor-pointer hover:text-cyan-600"
                        >
                          <span>NEXT LESSON</span>
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
                      <h4 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-green-300 p-1">
                          Refer friends to UNI201
                        </span>
                      </h4>
                      <div class="space-y-6 text-base my-2">
                        <p>
                          You currently have <b>{referrals()}</b> referral
                          {referrals() > 1 ? "s" : ""}.
                        </p>
                        <p>
                          Refer other students to join UNI201 by clicking the
                          button below to share your referral link to your
                          WhatsApp, X & Facebook:
                        </p>
                        <p>
                          <ShareButton
                            CId={
                              JSON.parse(localStorage.getItem("UNI201User"))
                                .custom_id
                            }
                          />
                        </p>
                        <p>Or copy & paste your referral link to others:</p>
                        <div class="flex">
                          <input
                            type="text"
                            id="myRefLink"
                            disabled
                            class="outline-none w-72 text-slate-600 border border-gray-50 p-1"
                            value={
                              "www.uni201.com.ng?ref=" +
                              JSON.parse(localStorage.getItem("UNI201User"))
                                .custom_id
                            }
                          />
                          <span
                            onClick={() => {
                              copyRefLink();
                            }}
                            class="w-fit p-1 border border-l-0 border-gray-50 hover:opacity-60 cursor-pointer"
                          >
                            Copy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="my-12 bg-white p-2 md:p-4">
                      <h4 class="text-base md:text-xl border-b-2 border-black pb-2">
                        <span class="bg-cyan-200 p-1">Comments</span>
                      </h4>
                      <div class="text-sm my-2 border border-black p-4">
                        <form autocomplete="off" onSubmit={submit}>
                          <div class="">
                            <TextArea
                              label={
                                "USER" +
                                JSON.parse(localStorage.getItem("UNI201User"))
                                  .id
                              }
                              name="comment"
                              required={true}
                              type="text"
                              max="600"
                              formHandler={formHandler}
                              placeholder="Type comment here..."
                            />
                          </div>
                          <div class="text-white text-right mt-2">
                            <Show
                              when={formHandler.isFormInvalid()}
                              fallback={
                                <>
                                  <Show
                                    when={isProcessing()}
                                    fallback={
                                      <button
                                        type="submit"
                                        class="bg-cyan-600 rounded-lg w-fit p-4 text-center hover:opacity-60"
                                      >
                                        Post Comment
                                      </button>
                                    }
                                  >
                                    <button
                                      disabled
                                      class="bg-gray-600 rounded-lg cursor-none w-fit p-4 text-center animate-pulse"
                                    >
                                      Posting.. .
                                    </button>
                                  </Show>
                                </>
                              }
                            >
                              <button
                                disabled
                                class="bg-gray-400 rounded-lg w-fit p-4 text-center cursor-not-allowed"
                              >
                                Post Comment
                              </button>
                            </Show>
                          </div>
                        </form>
                      </div>
                      <div class="text-base my-12 space-y-5">
                        <Show when={comments.length < 1} fallback={
                          <For each={comments}>
                          {(comment, i) => (
                            <div class="rounded-lg p-2 border border-gray-200 bg-gray-100 pb-4">
                              <div class="text-slate-600 uppercase mb-0 flex">
                                <span class="mt-0.5">User376</span>
                              </div>
                              <div>The comment by the user goes here.</div>
                            </div>
                          )}
                        </For>
                        }></Show>
                        
                      </div>
                    </div>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Issue;
