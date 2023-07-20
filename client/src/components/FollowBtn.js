import React, { useState } from "react";
import { getAllUser, following, unfollow } from "../api";
import { useStateValue } from "../context/StateProvider";
import { Color } from "devextreme-react/range-selector";

const FollowBtn = (btn) => {
  const [likesToogle, setLikesToggle] = useState(false);
  const [{ user }] = useStateValue();
  const [followingCount, setFollowingCount] = useState(0);
  const ChangeBtn = (prop) => {
    console.log("uid", prop);
    console.log("chal rha h?");
    setLikesToggle(!likesToogle);

    const userId = user.user._id;
    if (!likesToogle) following(userId, prop.data);
    else {
      unfollow(userId, prop.data);
    }
  };
  return (
    <div>
      <div>
        <button
          style={{ color: "white", backgroundColor: "#3f51b5" }}
          onClick={() => ChangeBtn(btn)}
        >
          {likesToogle ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default FollowBtn;
