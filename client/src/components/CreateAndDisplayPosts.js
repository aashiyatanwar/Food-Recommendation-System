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

import {
  getAllData, savePost
} from "../api";
import { actionType } from "../context/reducer";


export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
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
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "image" : ""}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "Image/*" : ""}`}
        onChange={uploadFile}
        className="w-0 h-0"
      />
    </label>
  );
};

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
  const [{user} , dispatch ] = useStateValue()
  
  
 

  const deleteImageObject = (postImageUrl, action) => {
    if (action === "image") {
      setIsImageLoading(true);
      setpostImageUrl(null);
    } 

    const deleteRef = ref(storage, postImageUrl);
    deleteObject(deleteRef).then(() => {
      console.log("file uploaded")
      setIsImageLoading(false);
    });
  };
  const savePosts = () => {
    if (!postImageUrl  || !text) {
      console.log("error")
    } else {
      setIsImageLoading(true);
      
      const data = {
        Caption: text ,
        images: postImageUrl,
      };

      

      savePost(data , user.user._id).then((res) => {
        getAllData().then((info) => {
          dispatch({ type: actionType.SET_ALL_DATA, allData: info.data });
        });
      });

      console.log("id" , user.user._id)
      
      setIsImageLoading(false);
      setText("");
      setpostImageUrl(null);
      
    }
  };
  return (
    <div className="flex flex-col flex-wrap items-center justify-center p-4 border border-gray-300 gap-4 rounded">
      <input
        type="text"
        placeholder="Food Name"
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      

      <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
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
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={postImageUrl}
                  alt="uploaded image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
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

      <div className="flex flex-col items-center justify-end w-full p-4">
        {isImageLoading  ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
            onClick={savePosts}
          >
            Send
          </motion.button>
        )}
      </div>

      

      
      
    </div>
  );
};


export default CreateAndDisplayPosts