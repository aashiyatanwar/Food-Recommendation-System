import React from 'react';
import Modal from 'react-modal';


const FollowedMembersModal = ({ followedMembers, closeModal }) => {
  return (
    <Modal isOpen={!!followedMembers} onRequestClose={closeModal}>
      <h2>Followed Members</h2>
      {followedMembers.map((member) => (
        <p key={member._id}>{member.name}</p>
      ))}
    </Modal>
  );
};

export default FollowedMembersModal;