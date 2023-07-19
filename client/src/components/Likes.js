import React, { useState, useEffect } from "react";
import "./FrontView/Frontview.css";
import { postLike, postUnlike } from "../api";
import { useStateValue } from "../context/StateProvider";
import CommentSection from "./Comments"

const Likes = (props) => {
  //console.log("props", props);
  const postId = props.data._id;
  //console.log("postid", postId);
  const [popupcontent, setPopupcontent] = useState([]);
  const [popuptogle, setPopuptogle] = useState(false);
  const [styling, setStyling] = useState(null);
  const [{ user }] = useStateValue();

  const changedcontent = (food) => {
    setPopupcontent([food]);
    setPopuptogle(!popuptogle);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
    }
  };

  const [likesContent, setLikesContent] = useState([]);
  const [likesToogle, setLikesToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    //likeCount = props.data.likes.length;
    
    setLikeCount(props.data.likes.length);
    //console.log("likesCount", likeCount);
  }, [props.data.likes]);

  const ChangeLike = (food) => {
    console.log("chal rha h?");
    setLikesToggle(!likesToogle);
    setLikeCount((prevCount) => (likesToogle ? prevCount - 1 : prevCount + 1));
    setLikesContent([food]);
    const postId = food.data._id;
    const data = { userId: user.user._id };
    if (!likesToogle) postLike(postId, data);
    else {
      postUnlike(postId, data);
    }
  };

  

  return (
    <div>
      <div className="content_card" key={props.data._id}>
        <img src={props.data.images} alt="" />
        <p>{props.data.Caption}</p>
        
        <p>{props.data.comments}</p>
        <button onClick={() => changedcontent(props)}>Comments</button>
      </div>
     
      <div>
      <button onClick={() => ChangeLike(props)}>
        {likesToogle ? "Unlike" : "Like"}
      </button>
      <p>Likes: {likeCount}</p>
      
    </div>

      {popuptogle && (
        <div className="pop_up_container" onClick={changedcontent}>
          <div className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <div className="pop_up_header">
              <button onClick={changedcontent}>xx</button>
            </div>
            <div className="pop_up_content">
              {popupcontent.map((pop) => {
                //console.log("pop", popupcontent);
                return (
                  <div className="pop_up_card">
                   <CommentSection data = {pop.data._id}></CommentSection>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Likes;
