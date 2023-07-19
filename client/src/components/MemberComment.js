import React, { useState, useEffect } from "react";
import { saveComment, getAllComment, deleteCommentById } from "../api";

export const MemberComment = (props) => {
  console.log("comment-prop", props.data._id);
  const postId = props.data._id;
  const memberId = props.data.user;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await getAllComment(postId);
      console.log("response", response.data.comments);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }

    const data = { text: newComment };

    try {
      console.log("userid", memberId);
      console.log("postId", postId);
      console.log("datatext", data);
      saveComment(memberId, postId, data)
        .then((response) => {
          const responseArray = Array.isArray(response) ? response : [response];
          console.log("responseComment", responseArray);
          const newComments = responseArray.map((item) => item.comment);
          setComments([...comments, ...newComments]);
          console.log("setComments", comments);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });

      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Function to handle comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      console.log("commentId", commentId);
      deleteCommentById(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {console.log("comments", comments)}

        {comments.map((comment) => (
          <li key={comment._id}>
            <span>{comment.text}</span>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default MemberComment;
