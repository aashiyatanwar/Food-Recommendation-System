import React, { useEffect, useState } from "react";
import {
  getUserById,
  getUserFollowing,
  getNotinFollowing,
  getUserFollower,
  postLike,
  postUnlike,
  getAllPostOfUser,
} from "../api";
import { useParams } from "react-router-dom";
import MemberComment from "./MemberComment"
import Navbar from "./Navbar";
import { Nav } from "reactstrap";
import { Postdata } from "./FinalData";
import CommentSection from "./Comments";

const MemberDetails = () => {
  const { memberId } = useParams();
  const Id = { _id: memberId };

  const [userFollowing, setUserFollowing] = useState([]);
  const [notInFollowing, setNotInFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [member, setMember] = useState([]);
  const [postData, setPostData] = useState([]);
  const [array, setArray] = useState([]);
  let memarray = [];
  var obj = {};
  var postobj = {};

  const [likesToogle, setLikesToogle] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  /*useEffect(() => {
    //likeCount = props.data.likes.length;
    
    setLikeCount(postData.likes.length);
    //console.log("likesCount", likeCount);
  }, [postData.likes]);
  */

  const changeContent = (props) => {
    setLikesToogle(!likesToogle);
    setLikeCount((prevCount) => (likesToogle ? prevCount - 1 : prevCount + 1));

    const postId = props._id;
    const data = { userId: member._id };
    if (!likesToogle) postLike(postId, data);
    else {
      postUnlike(postId, data);
    }
  };
  //use effect for receiving the followers and follwing of the new member
  useEffect(() => {
    console.log("hiiii");
    const fetchData = async () => {
      try {
        if (memberId) {
          const result1 = await getUserFollowing(memberId);
          console.log("result1", result1);
          if (result1.data) setUserFollowing(result1.data);

          const result2 = await getNotinFollowing(memberId);
          console.log("result2", result2.data);

          if (result2.data) {
            const filteredData = result2.data.filter(
              (item) => item._id !== memberId
            );
            setNotInFollowing(filteredData);
          }

          const result3 = await getUserFollower(memberId);
          console.log("result3", result3);

          if (result3.data) setUserFollower(result3.data);

          const result4 = await getUserById(memberId);
          console.log("result 4 ", result4.data);
          const memberData = result4.data;
          console.log("memberdata", memberData.data);
          obj = result4.data;
          if (result4) setMember([...memberData.data]);

          member.map((item) => {
            console.log("membe name", item.name);
          });

          console.log("member ", member);
          // console.log("mem array ", obj.name);

          const allpost = await getAllPostOfUser(memberId);
          console.log("All Post ", allpost);
          postobj = allpost.data;
          console.log("postobj ", postobj);
          if (allpost) setPostData([...postobj.posts]);
          console.log("post array", postData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div>
      {member &&
        member.map((item) => {
          return (
            <>
              <img
                className="w-12 min-w object-cover rounded-full shadow-lg"
                src={item.imageURL}
                alt=""
                referrerPolicy="no-referrer"
              />
              <p>Following count </p>
              <p>{userFollowing.length}</p>
              <p>Name :{item.name}</p>
              <br></br>
              <p> Follwer count</p>
              <p>{userFollower.length}</p>
            </>
          );
        })}
      <div>
        {postData.map((item) => {
          return (
            <div>
              <img src={item.images} />

              <button onClick={() => changeContent(item)}>
                {likesToogle ? "Unlike" : "Like"}
              </button>
              <p>likes : {likeCount}</p>
              <MemberComment data = {item}></MemberComment>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberDetails;
