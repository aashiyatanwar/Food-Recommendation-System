import React, { useState, useEffect } from "react";
import "./FrontView/Frontview.css";
import { postLike, postUnlike } from "../api";
import { useStateValue } from "../context/StateProvider";
import CommentSection from "./Comments";
import "./Likes.css";
import { Width } from "devextreme-react/range-selector";
const Likes = (props) => {
  //console.log("props", props);
  const postId = props.data._id;
  //console.log("postid", postId);
  const [popupcontent, setPopupcontent] = useState([]);
  const [popuptogle, setPopuptogle] = useState(false);
  const [styling, setStyling] = useState(null);
  const [{ user }] = useStateValue();
  // Replace with your desired height in pixels
  const changedcontent = (food) => {
    const popupWidth = 1600; // Replace with your desired width in pixels
    const popupHeight = 1600;
    setPopupcontent([food]);
    setPopuptogle(!popuptogle);

    if (popuptogle) {
      setStyling(null); // If popup is being closed, remove styling
    } else {
      setStyling({ position: "fixed" }); // If popup is being opened, set the width and height
    }
  };

  const [likesContent, setLikesContent] = useState([]);
  const [likesToogle, setLikesToggle] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  useEffect(() => {
    //likeCount = props.data.likes.length;
    setLikesToggle(!likesToogle);
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
    <div className="parent-container">
      <div className="content_card" key={props.data._id}>
        <img src={props.data.images} alt="" />

        <button
          className="buttoncaption"
          onMouseEnter={() => setShowCaption(true)}
          onMouseLeave={() => setShowCaption(false)}
        >
          Caption
        </button>

        {showCaption && <p className="pop_up_caption">{props.data.Caption}</p>}
      </div>

      <div className="likes">
        <button onClick={() => ChangeLike(props)}>
          {likesToogle ? "Unlike " : "Like "}
          {likeCount}
        </button>
      </div>
      <div className="comments">
        <button className="buttoncomment" onClick={() => changedcontent(props)}>
          Comments
        </button>
      </div>
      {popuptogle && (
        <div className="pop_up_containers" onClick={changedcontent}>
          <div
            className="pop_up_bodys"
            style={styling}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pop_up_headers">
              <button onClick={changedcontent}>x</button>
            </div>
            <div className="pop_up_contents">
              {popupcontent.map((pop) => {
                //console.log("pop", popupcontent);
                return (
                  <div className="pop_up_cards">
                    <CommentSection data={pop.data._id}></CommentSection>
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
