import React, { useEffect, useState } from "react";
import {
  getAllUser,
  following,
  unfollow,
  getFollowing,
  getUserFollowing,
  getNotinFollowing,
  getUserFollower,
  getUserById
} from "../api";
import { useStateValue } from "../context/StateProvider";
import FollowBtn from "./FollowBtn";

const Followers = () => {
  const [likesToogle, setLikesToggle] = useState(false);
  const [userData, setuserData] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [notInFollowing , setNotInFollowing] = useState([])
  const [userFollower , setUserFollower] = useState([])
  const [{ user }] = useStateValue();
 
  var arr = [];
  useEffect(() => {
    console.log("hiiii");
    const fetchData = async () => {
      try {

        if (user && user.user._id) {
          const result1 = await getUserFollowing(user.user._id);
          console.log("result1", result1);
          if (result1.data) setUserFollowing(result1.data);

          const result2 = await getNotinFollowing(user.user._id)
          console.log("result2" , result2.data)
          
          
          if (result2.data) { 
            const filteredData = result2.data.filter((item) => item._id !== user.user._id);
            setNotInFollowing(filteredData);
          }

          const result3 = await getUserFollower(user.user._id)
          console.log("result3" , result3)

          if(result3.data) setUserFollower(result3.data)
          console.log("id" , user.user._id)
          const result4 = await getUserById(user.user._id)
          console.log("result4" , result4.data.data)
          setuserData(result4.data.data)
          console.log("userData" , userData)
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  /*const allUserIds = new Set(userData.map((user) => user._id));
  const followedUserIds = new Set(following.map((item) => item._id));
  console.log("followedUSer", followedUserIds);
  const notFollowedUserIds = [...allUserIds].filter(
    (userId) => !followedUserIds.has(userId)
  );
  console.log("idss", notFollowedUserIds);

  const intersectedUsers = userData.filter((user) =>
    notFollowedUserIds.includes(user._id)
  );
  console.log("newid", intersectedUsers);
  */

  return (
    <div>
      <div>
        {notInFollowing.map((item) => {
          {
            console.log("userfollowing", notInFollowing);
          }
          return (
            <>
              <div>
                <p>{item.name}</p>
                <img
                  className="w-12 min-w object-cover rounded-full shadow-lg"
                  src={item.imageURL}
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <div>Following Count : {user.user.following.length}</div>
              <div>Follower count : {user.user.followers.length}</div>
              </div>
              
              <FollowBtn data={item._id}></FollowBtn>
              {/*<div>
                <button onClick={() => ChangeBtn(item._id)}>
                  {likesToogle ? "Unfollow" : "Follow"}
                </button>
              </div>
              */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Followers;