import React from 'react';
import Modal from 'react-modal';

const FollowersModal = ({ followers, closeModal }) => {
  return (
    <Modal isOpen={!!followers} onRequestClose={closeModal}>
      <h2>Followers</h2>
      {followers.map((follower) => (
        <p key={follower._id}>{follower.name}</p>
      ))}
    </Modal>
  );
};

export default FollowersModal;