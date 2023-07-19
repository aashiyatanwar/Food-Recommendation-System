import React, { useState, useEffect } from "react";
import FollowedMembersModal from "./FollowedMembersModal";
import FollowersModal from "./FollowersModal";
import { getUserFollower, getUserFollowing } from "../api";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";

const FollowerModal = () => {
  const [followedMembers, setFollowedMembers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showFollowedMembersModal, setShowFollowedMembersModal] = useState(
    false
  );
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [{ user }] = useStateValue();

  // Fetch the followers and following data
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await getUserFollower(user.user._id);
        setFollowers(followersData.data);
        console.log("Followers data ", followers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const followingData = await getUserFollowing(user.user._id);
        setFollowedMembers(followingData.data);
        console.log("FOLLOWING DATA", followedMembers);
      } catch (error) {
        console.error("Error fetching followed members:", error);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, [user]);
  const [popupFollwing, setPopupFollowing] = useState(false);
  const [popupFollower, setPopupFollower] = useState(false);
  const [styling, setStyling] = useState(null);
  const changedcontent = () => {
    //setPopupcontent([food]);
    setPopupFollowing(!popupFollwing);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
    }
  };
  const changedFollower = () => {
    //setPopupcontent([food]);
    setPopupFollower(!popupFollower);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
    }
  };

  const openFollowedMembersModal = () => {
    setShowFollowedMembersModal(true);
  };

  const openFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const closeFollowedMembersModal = () => {
    setShowFollowedMembersModal(false);
  };

  const closeFollowersModal = () => {
    setShowFollowersModal(false);
  };

  return (
    <div>
      {followedMembers.length}
      <button onClick={changedcontent}>Following </button>
      {popupFollwing && (
        <div className="pop_up_container" onClick={changedcontent}>
          <div className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <div className="pop_up_header">
              <button onClick={changedcontent}>xx</button>
            </div>
            <div className="pop_up_content">
              {followedMembers.map((pop) => {
                return (
                  <div className="pop_up_card">
                    <div key={pop._id}>
                      <Link to={`/UserProfile/${pop._id}`}>{pop.name}</Link>

                      <img
                        className="w-12 min-w object-cover rounded-full shadow-lg"
                        src={pop.imageURL}
                        alt=""
                        referrerPolicy="no-referrer"
                      />
                      <p> details: {pop._id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {followers.length}
      <button onClick={changedFollower}>Followers</button>
      {popupFollower && (
        <div className="pop_up_container" onClick={changedFollower}>
          <div className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <div className="pop_up_header">
              <button onClick={changedFollower}>xx</button>
            </div>
            <div className="pop_up_content">
              {followers.map((pop) => {
                return (
                  <div className="pop_up_card">
                    <p>name: {pop.name}</p>
                    <img src={pop.imageURL}></img>
                    <p> details: {pop._id}</p>
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

export default FollowerModal;
