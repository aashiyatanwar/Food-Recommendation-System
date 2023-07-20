import React, { useState, useEffect } from "react";
import { saveComment, getAllComment, deleteCommentById } from "../api";
import { useStateValue } from "../context/StateProvider";
import './Comments.css'

const CommentSection = (props) => {
  console.log("props", props);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [{ user }] = useStateValue();
  
  // Load comments for the post on component mount
  useEffect(() => {
    fetchComments();
  }, []);

const fetchComments = async () => {
    try {
      const response = await getAllComment(props.data);
      console.log("response" , response.data.comments)
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
      console.log("userid", user.user._id);
      console.log("postId", props.data);
      console.log("datatext", data);
      saveComment(user.user._id, props.data, data)
        .then((response) => {
          const responseArray = Array.isArray(response) ? response : [response];
          console.log("responseComment" , responseArray);
          const newComments = responseArray.map((item) => item.comment);
          setComments([...comments ,...newComments])
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
      console.log("commentId" , commentId)
      deleteCommentById(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h3 className="commentheader">Comments</h3>
      <ul>
        {console.log("comments", comments)}
        
        {comments.map((comment) => (
          <li key={comment._id}>
            <span className="text">{comment.text}</span>
            <button className="delete" onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form className="formcomment" onSubmit={handleSubmitComment}>
        <input className="addcomment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="commentbutton" type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
