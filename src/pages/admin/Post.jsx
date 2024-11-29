import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextInput from "../../components/TextInput";
import Success from "../../components/icons/Success";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { createSignal, createEffect } from "solid-js";
import {
  ClassicEditor,
  PasteFromOffice,
  Image,
  AutoImage,
  ImageInsert,
  Essentials,
  Bold,
  Italic,
  Font,
  Paragraph,
  Link,
  List,
  Heading,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const schema = z.object({
  issue_number: z.string().min(1, "*Invalid"),
  post_highlight: z.string().min(1, "*Invalid"),
  post_bg: z.string().min(1, "*Invalid"),
  post_topic: z.string().min(1, "*Invalid"),
  shareable: z.string().min(1, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Post() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const navigate = useNavigate();

  const [data, setData] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [showSuccess, setShowSuccess] = createSignal(false);

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const now = new Date();

    const editorData = editor.getData();

    var dataToPost = {
      issue_number: formData().issue_number,
      post_highlight: formData().post_highlight,
      post_bg: formData().post_bg,
      post_topic: formData().post_topic,
      shareable: formData().shareable,
      slug: formData()
        .shareable.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      conversation_text: editorData,
    };

    if (dataToPost) {
      try {
        const response = await fetch(VITE_API_URL + "/api/create-post", {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("techINJosUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(dataToPost),
        });
        const result = await response.json();
        if (result.response === "Expired token") {
          localStorage.removeItem("techINJosUser");
          navigate("/", { replace: true });
        } else if (result.success) {
          setShowSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No conversation text");
    }
  };

  var editor;

  const checkUser = async () => {
    if (
      JSON.parse(localStorage.getItem("techINJosUser")) &&
      JSON.parse(localStorage.getItem("techINJosUser")).user_role === "admin"
    ) {
      const response = await fetch(
        VITE_API_URL +
          "/api/user/" +
          JSON.parse(localStorage.getItem("techINJosUser")).custom_id,
        {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("techINJosUser")).token
            }`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("techINJosUser");
        navigate("/", { replace: true });
      } else {
        ClassicEditor.create(document.querySelector("#editor"), {
          plugins: [
            Essentials,
            Bold,
            Italic,
            Font,
            Paragraph,
            Image,
            AutoImage,
            ImageInsert,
            Link,
            List,
            PasteFromOffice,
            Heading,
          ],
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "insertImage",
              "|",
              "link",
              "|",
              "bulletedList",
              "numberedList",
            ],
          },
          link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
            addTargetToExternalLinks: true,
          },
        })
          .then((newEditor) => {
            editor = newEditor;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      navigate("/", { replace: true });
    }
  };

  createEffect(() => {
    checkUser();
  });
  return (
    <MetaProvider>
      <Title>Post - www.techinjos.com.ng</Title>
      <Meta
        name="description"
        content="Post to techINJos, the #1 Weekly and Quick Brief for Jos' Tech Ecosystem!"
      />
      <div>
        <Header />

        <Show when={showSuccess()}>
          <div class="fixed text-sm z-50 bg-slate-950 bg-opacity-90 h-screen w-screen top-0 bottom-0 left-0 right-0 flex items-center">
            <div class="bg-white p-4 rounded-lg w-80 mx-auto">
              <Success />
              <div class="text-center space-y-4 my-4">
                <p>It was published successfully.</p>
                <p>
                  <span
                    onClick={() => {
                      window.location.reload();
                    }}
                    class="bg-blue-950 text-white p-2 rounded-lg hover:opacity-60"
                  >
                    Okay
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Show>
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-pink-300 p-1">Post</span>
                </h2>
                <div class="space-y-6 text-base">
                  <form
                    autocomplete="off"
                    onSubmit={submit}
                    class="my-4 w-full mx-auto space-y-4"
                  >
                    <div>
                      <TextInput
                        label="Issue No.:"
                        name="issue_number"
                        required={true}
                        type="number"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Post Highlight:"
                        name="post_highlight"
                        required={true}
                        type="text"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Post Background Color:"
                        name="post_bg"
                        required={true}
                        type="text"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Post Topic:"
                        name="post_topic"
                        required={true}
                        type="text"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Shareable Text:"
                        name="shareable"
                        required={true}
                        type="text"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <div>
                        <label class="">Content Text:</label>
                        <b class="text-red-600">*</b>
                      </div>
                      <div>
                        <div id="editor"></div>
                      </div>
                    </div>

                    <Show when={message() !== ""}>
                      <div class="bg-purple-200 text-purple-900 p-3 text-center animate-pulse border-l-2 border-black">
                        {message()}
                      </div>
                    </Show>
                    <div class="text-white">
                      <Show
                        when={formHandler.isFormInvalid()}
                        fallback={
                          <>
                            <Show
                              when={isProcessing()}
                              fallback={
                                <button
                                  type="submit"
                                  class="bg-red-600 rounded-lg w-full p-3 text-center hover:opacity-60"
                                >
                                  Post
                                </button>
                              }
                            >
                              <button
                                disabled
                                class="bg-gray-600 rounded-lg cursor-none w-full p-3 text-center animate-pulse"
                              >
                                Processing.. .
                              </button>
                            </Show>
                          </>
                        }
                      >
                        <button
                          disabled
                          class="bg-gray-400 rounded-lg w-full p-3 text-center cursor-not-allowed"
                        >
                          Post
                        </button>
                      </Show>
                    </div>
                  </form>
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

export default Post;
