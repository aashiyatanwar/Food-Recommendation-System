import React, { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { motion } from "framer-motion";

import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";

import { getAllData, savePost } from "../api";
import { actionType } from "../context/reducer";

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div
        style={{
          width: "4rem",
          height: "4rem",
          backgroundColor: "white",
          animation: "ping 1s infinite",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: "white",
            filter: "blur(0.75rem)",
          }}
        ></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  setImageURL,
  isLoading,
  isImage,
  setProgress,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    console.log("file:");
    console.log(uploadedFile);

    const storageRef = ref(
      storage,
      `${isImage ? "Images" : ""}/${Date.now()}-${uploadedFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("Upload is done" + progress);
      },
      (error) => {
        console.log("error");
        isLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
          setProgress(0);
          isLoading(false);
        });
      }
    );
  };

  return (
    <label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "2rem" }}></p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Click to upload {isImage ? "image" : ""}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "Image/*" : ""}`}
        onChange={uploadFile}
        style={{ width: "0", height: "0" }}
      />
    </label>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      style={{
        color: "white",
        backgroundColor: "blue",
        cursor: "default",
        fontSize: "0.875rem",
        fontWeight: "500",
        borderRadius: "0.375rem",
        padding: "0.625rem 1.25rem",
        marginRight: "0.5rem",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <svg
        role="status"
        className="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

const CreateAndDisplayPosts = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [postImageUrl, setpostImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [text, setText] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const deleteImageObject = (postImageUrl, action) => {
    if (action === "image") {
      setIsImageLoading(true);
      setpostImageUrl(null);
    }

    const deleteRef = ref(storage, postImageUrl);
    deleteObject(deleteRef).then(() => {
      console.log("file uploaded");
      setIsImageLoading(false);
    });
  };

  const savePosts = () => {
    if (!postImageUrl || !text) {
      console.log("error");
    } else {
      setIsImageLoading(true);

      const data = {
        Caption: text,
        images: postImageUrl,
      };

      savePost(data, user.user._id).then((res) => {
        getAllData().then((info) => {
          dispatch({ type: actionType.SET_ALL_DATA, allData: info.data });
        });
      });

      console.log("id", user.user._id);

      setIsImageLoading(false);
      setText("");
      setpostImageUrl(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Enter Food Name"
        style={{
          width: "80%",
          margin: "0 auto",
          padding: "0.75rem",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#333",
          outline: "none",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          background: "#F2F2F2",
          transition: "border-color 0.3s ease",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div
        style={{
          background: "#F9FAFB",
          backdropFilter: "blur(10px)",
          width: "80%",
          height: "200px",
          borderRadius: "0.375rem",
          border: "2px dashed #ccc",
          cursor: "pointer",
        }}
      >
        {isImageLoading && <FileLoader progress={uploadProgress} />}
        {!isImageLoading && (
          <>
            {!postImageUrl ? (
              <FileUploader
                setImageURL={setpostImageUrl}
                isLoading={setIsImageLoading}
                setProgress={setUploadProgress}
                isImage={true}
              />
            ) : (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "0.375rem",
                }}
              >
                <img
                  src={postImageUrl}
                  alt="uploaded image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    right: "0.75rem",
                    padding: "0.75rem",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  onClick={() => {
                    deleteImageObject(postImageUrl, "Images");
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "80%",
          padding: "1rem",
        }}
      >
        {isImageLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            style={{
              padding: "0.5rem 2rem",
              borderRadius: "0.375rem",
              color: "white",
              backgroundColor: "#f56565",
              cursor: "pointer",
            }}
            onClick={savePosts}
          >
            Send
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CreateAndDisplayPosts;
