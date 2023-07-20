import React, { useEffect, useState } from "react";
import "./MemberDetails.css";
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
import MemberComment from "./MemberComment";
import Navbar from "./Navbar";
import { Nav } from "reactstrap";
import { Postdata } from "./FinalData";
import CommentSection from "./Comments";
import { bgColors } from "../utils/style";
import { useStateValue } from "../context/StateProvider";
import MemberLike from "./MemberLike";

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
  const [popupcontent, setPopupcontent] = useState([]);
  const [popuptogle, setPopuptogle] = useState(false);
  const [styling, setStyling] = useState(null);

  //for like
  const changedcontent = (food) => {
    setPopupcontent([food]);
    setPopuptogle(!popuptogle);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
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
            <div className="container">
              <img
                className="w-12 min-w object-cover rounded-full shadow-lg image"
                src={item.imageURL}
                alt=""
                referrerPolicy="no-referrer"
              />
              <p className="names">{item.name}</p>
              <div className="fff">
                <div className="FollowerModal__container">
                  <p className="Followingcount">Following</p>
                  <p className="FollowerModal__length">
                    {userFollowing.length}
                  </p>
                </div>
                <div className="FollowerModal__container ">
                  <p className="Followercount">Followers</p>
                  <p className="FollowerModal__length">{userFollower.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      <div className="parent-containers">
        {postData.map((item) => {
          return (
            <div className="content_cards">
              <img alt="" src={item.images} />
              <p className="caption">{item.Caption}</p>
              <div className="likee">
                <MemberLike data={item}></MemberLike>
              </div>
              <div>
                <p>{item.comments}</p>
              </div>
              <button className="comm" onClick={() => changedcontent(item)}>
                Comments
              </button>

              {popuptogle && (
                <div className="pop_up_container" onClick={changedcontent}>
                  <div
                    className="pop_up_body"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pop_up_header">
                      <button onClick={changedcontent}>x</button>
                    </div>
                    <div className="pop_up_content">
                      {popupcontent.map((pop) => {
                        console.log("pop", popupcontent);
                        return (
                          <div className="pop_up_card">
                            <MemberComment data={pop}></MemberComment>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberDetails;
