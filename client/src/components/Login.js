/*
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";
import { actionType } from "../context/reducer";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              console.log(token);
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/Login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="relative w-screen h-screen">
      <img
        src={""}
        type=""
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></img>

      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full h-370 md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center  gap-4 px-4 py-2 rounded-md text-2xl cursor-pointer"
            style={{
              marginBottom: "50px",
              padding: "10px",
              textAlign: "justify",
            }}
          >
            <p className="text-lg text-center">
              GET ALL STUDY MATERIAL IN ONE PLACE
            </p>
          </div>
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
          >
            <FcGoogle className="text-xl" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup , signInWithRedirect} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";
import { actionType } from "../context/reducer";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      console.log(userCred);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              console.log(token);
              validateUser(token).then((data) => {
                console.log("id" , data.user._id)
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                  
                });
                
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/Login");
          }
        });
      }
    });
  };
  



  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <img
        src={"../food-rec-sys.jpg"}
        
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      ></img>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "500px",
            maxWidth: "375px",
            padding: "16px",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "24px",
              cursor: "pointer",
              marginBottom: "50px",
              padding: "10px",
              textAlign: "justify",
            }}
          >
            <p style={{ fontSize: "16px", textAlign: "center" }}>
             
              </p>
          </div>
          <img
        src={"../food-rec-sys.png"}
        
        style={{ width: "100%", height: "150%", objectFit: "cover" }}
      ></img>
          <div
            onClick={loginWithGoogle}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              padding: "8px",
              borderRadius: "4px",
              background: "#E5E7EB",
              cursor: "pointer",
              transition: "background 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            }}
          >
            <FcGoogle style={{ fontSize: "24px" }} />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
