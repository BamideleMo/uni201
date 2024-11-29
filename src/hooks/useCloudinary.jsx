import axios from "axios";
import shortid from "shortid";
import { createStore } from "solid-js/store";

const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;

const VITE_API_URL = import.meta.env["VITE_API_URL"];

export default function useCloudinary() {
  const [store, setStore] = createStore({
    image: null,
    imagePreview: "",
    uploadProgress: 0,
    alert: null,
    abortToken: null,
  });

  function handleImageChange(e) {
    const image = e.target.files[0];
    // create blob url of selected image for preview
    const imagePreview = URL.createObjectURL(image);
    // create axios cancellation token to abort request in future
    const abortToken = axios.CancelToken.source();

    setStore("image", image);
    setStore("imagePreview", imagePreview);
    setStore("abortToken", abortToken);
    setStore("alert", {
      status: "loaded",
      severity: "success",
      text: "Image loaded successfully",
    });
  }
  function handleImageRemove() {
    // cleanup blob  metadata
    URL.revokeObjectURL(store.imagePreview);
    window.location.reload();
  }
  async function handleImageUpload(issueNumber, description) {
    try {
      const formData = new FormData();
      formData.append("file", store.image);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
      formData.append("public_id", shortid.generate());

      const response = await axios.post(url, formData, {
        onUploadProgress: handleUploadProgess,
        cancelToken: store.abortToken.token,
      });

      // revoke preview blob url
      URL.revokeObjectURL(store.imagePreview);
      setStore("imagePreview", response.data.url);
      setStore("uploadProgress", "no");
      await postToDB(issueNumber, response.data.url, description);
    } catch (error) {
      console.log(error);
    }
  }

  const postToDB = async (issueNumber, Url, description) => {
    try {
      const response = await fetch(VITE_API_URL + "/api/create-meta", {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("techINJosUser")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          issue_number: issueNumber,
          url: Url,
          description: description,
        }),
      });
      const result = await response.json();
      if (result.response === "Expired token") {
        localStorage.removeItem("techINJosUser");
        navigate("/", { replace: true });
      } else if (result.success) {
        setStore("alert", {
          status: "uploaded",
          severity: "success",
          text: "Image uploaded to cloudinary successfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleUploadProgess(progressEv) {
    const progress = Math.floor((progressEv.loaded / store.image.size) * 100);
    setStore("uploadProgress", progress);
  }

  function handleCancelUpload() {
    store.abortToken.cancel();
    setStore("alert", {
      status: "error",
      severity: "error",
      text: "Image upload aborted",
    });
  }
  return {
    store,
    handleImageChange,
    handleImageRemove,
    handleImageUpload,
    handleCancelUpload,
  };
}
