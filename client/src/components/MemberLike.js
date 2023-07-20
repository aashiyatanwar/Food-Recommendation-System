import React, { useEffect, useState } from "react";
import "./MemberLike.css";
import {
  getUserById,
  getUserFollowing,
  getNotinFollowing,
  getUserFollower,
  postLike,
  postUnlike,
  getAllPostOfUser,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { FaTruckMonster } from "react-icons/fa";
const MemberLike = (props) => {
  console.log(props);
  const [likesContent, setLikesContent] = useState([]);
  const [likesToogle, setLikesToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [{ user }] = useStateValue();

  useEffect(() => {
    //likeCount = props.data.likes.length;
    console.log("likeLen", props.data.likes.length);

    setLikeCount(props.data.likes.length);
    setLikesToggle(!likesToogle);
    //console.log("likesCount", likeCount);
  }, [props.data.likes]);

  const ChangeLike = () => {
    console.log("chal rha h?");
    setLikesToggle(!likesToogle);
    setLikeCount((prevCount) => (likesToogle ? prevCount - 1 : prevCount + 1));
    setLikesContent([props.data]);
    const postId = props.data._id;
    const data = { userId: user.user._id };
    if (!likesToogle) postLike(postId, data);
    else {
      console.log("unlike");
      postUnlike(postId, data);
    }
  };

  return (
    <div>
      <div className="countlike">
        <button className="likebutton" onClick={ChangeLike}>
          {likesToogle ? "Unlike " : "Like "}
          {likeCount}
        </button>
      </div>
    </div>
  );
};

export default MemberLike;
