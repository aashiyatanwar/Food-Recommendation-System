import React, { useState } from 'react';
import {postLike} from "../api"

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [{user}] = useStateValue()

  const handleLike = () => {
    // Toggle the like status
    setIsLiked(!isLiked);

    // Make API call to update the likes on the server
    const data = {
        userId : user.user._id
    }
    postLike()
  };

  return (
    <div>
      <h3>Post Title</h3>
      <p>Post content</p>
      <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>
    </div>
  );
};

export default Post;