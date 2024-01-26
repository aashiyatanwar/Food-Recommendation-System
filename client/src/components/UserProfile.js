import React from "react";
import { useEffect, useState } from "react";

import { useStateValue } from "../context/StateProvider";
import CreateAndDisplayPosts from "./CreateAndDisplayPosts";
import { Postdata } from "./FinalData";
import "./FrontView/Frontview.css";
import Likes from "./Likes";
import Followers from "./Followers"
import FollowerModal from "./FollowerModal";
import { deletePostById } from "../api";
const UserProfile = () => {
  const [{ user }, dispatch] = useStateValue();
  const [array, setArray] = useState([]);
  //console.log("user", user);

  

  useEffect(() => {
    if(user && user.user._id){
      Postdata(user.user._id)
      .then((data) => {
        setArray(Array.from(data));
        //console.log("data array", array);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    
  }, [user]);

  const handleDeletePost = async (postId) => {
    try {
      console.log("commentId" , postId)
      deletePostById(postId);
      setArray(array.filter((item) => item._id !== postId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  const [popupcontent, setPopupcontent] = useState([]);
  const [popuptogle, setPopuptogle] = useState(false);
  const changedcontent = (food) => {
    setPopupcontent([food]);
    setPopuptogle(!popuptogle);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
    }
  };

  const [styling, setStyling] = useState(null);

  return (
    <div>
      <div>
        <img
          className="w-12 min-w object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
        </div>
        <Followers></Followers>
        <FollowerModal></FollowerModal>
        <CreateAndDisplayPosts></CreateAndDisplayPosts>
      </div>
      <div className="app_container">
       <div className="content_container" style={styling}>
          {array.map((food) => {
            return (
              <> <span>
                <Likes data={food} />
                <button onClick={() => handleDeletePost(food._id)}>
              Delete
            </button>
                </span>
              </>
            );
          })}
        </div>
        {popuptogle && (
          <div className="pop_up_container" onClick={changedcontent}>
            <div className="pop_up_body" onClick={(e) => e.stopPropagation()}>
              <div className="pop_up_header">
                <button onClick={changedcontent}>xx</button>
              </div>
              <div className="pop_up_content">
                {popupcontent.map((pop) => {
                  return (
                    <div className="pop_up_card">
                      <p>name: {pop.name}</p>
                      <p> details: {pop.details}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
