import { A, useNavigate } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import TextInput from "../../components/TextInput";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import Success from "../../components/icons/Success";

import { ThemeProvider } from "@suid/material";
import Button from "@suid/material/Button";
import Card from "@suid/material/Card";
import CardActions from "@suid/material/CardActions";
import CardMedia from "@suid/material/CardMedia";
import LinearProgress from "@suid/material/LinearProgress";
import Stack from "@suid/material/Stack";
import useCloudinary from "../../hooks/useCloudinary";

const schema = z.object({
  issue_number: z.string().min(1, "*Invalid"),
  description: z.string().min(1, "*Invalid"),
});

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function PostMetaImage() {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const navigate = useNavigate();

  let fileInputRef = null;
  const {
    store,
    handleImageChange,
    handleImageRemove,
    handleImageUpload,
    handleCancelUpload,
  } = useCloudinary();

  const submit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    var dataToPost = {
      issue_number: formData().issue_number,
    };
  };

  createEffect(() => {
    if (
      !JSON.parse(localStorage.getItem("techINJosUser")) ||
      JSON.parse(localStorage.getItem("techINJosUser")).user_role !== "admin"
    ) {
      navigate("/");
    }
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

        <Show when={store.alert && store.alert.status === "uploaded"}>
          <div class="fixed text-sm z-50 bg-slate-950 bg-opacity-90 h-screen w-screen top-0 bottom-0 left-0 right-0 flex items-center">
            <div class="bg-white p-4 rounded-lg w-80 mx-auto">
              <Success />
              <div class="text-center space-y-4 my-4">
                <p>Advert was published successfully.</p>
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
                  <span class="bg-pink-300 p-1">Post Meta Picture</span>
                </h2>
                <div class="space-y-6 text-base">
                  <form
                    autocomplete="off"
                    onSubmit={submit}
                    class="mt-8 space-y-4"
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
                        label="Description:"
                        name="description"
                        required={true}
                        type="text"
                        formHandler={formHandler}
                      />
                    </div>
                    <div>
                      <div class="bg-blue-100 border border-blue-200 p-2">
                        <div>
                          <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <div
                            onClick={() => fileInputRef.click()}
                            variant="contained"
                            size="large"
                            class="flex hover:opacity-60 space-x-2 bg-gray-50 border rounded-lg p-3 cursor-pointer w-fit"
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
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                              />
                            </svg>

                            <div>Select Image</div>
                          </div>
                        </div>
                        {console.log(store.uploadProgress)}
                        <Show
                          when={
                            store.uploadProgress &&
                            store.uploadProgress !== "no"
                          }
                        >
                          <Stack direction={"column"} spacing={2}>
                            <LinearProgress
                              sx={{ mt: 4 }}
                              variant="determinate"
                              value={store.uploadProgress}
                            />
                            <Button
                              variant="contained"
                              color="error"
                              onClick={handleCancelUpload}
                            >
                              Cancel Upload
                            </Button>
                          </Stack>
                        </Show>
                        <Show when={store.imagePreview}>
                          <Card sx={{ mt: 4 }}>
                            <CardMedia
                              component="img"
                              class="max-w-80 mx-auto my-4"
                              image={store.imagePreview}
                              alt="Image Preview"
                            />

                            <CardActions>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={handleImageRemove}
                              >
                                Remove
                              </Button>
                              <Show
                                when={formData().issue_number}
                                fallback={
                                  <span class="bg-gray-300 cursor-not-allowed p-1.5 ml-3 rounded">
                                    Upload
                                  </span>
                                }
                              >
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    handleImageUpload(
                                      formData().issue_number,
                                      formData().description
                                    );
                                  }}
                                >
                                  Upload
                                </Button>
                              </Show>
                            </CardActions>
                          </Card>
                        </Show>
                      </div>
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

export default PostMetaImage;
