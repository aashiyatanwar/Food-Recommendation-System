import axios from "axios";


const baseURL = "http://localhost:5000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);

    return res;
  } catch (error) {
    return null;
  }
};

export const getCurUser = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/currentUser`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = axios.get(`${baseURL}api/users/getUser/${userId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const getAllData = async () => {
  try {
    const res = await axios.get(`${baseURL}api/sample/getAll`);
    console.log("sample", res);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getDataById = async () => {
  let numbers = [];
  try {
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      const res = await axios.get(
        `${baseURL}api/sample/getOne/${randomNumber}`
      );
      numbers.push(res);
    }

    return numbers;
  } catch (error) {
    return null;
  }
};

export const followers = async (userId, uid) => {
  try {
    const res = axios.put(
      `${baseURL}api/users/follower/${userId}?follower=${uid}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const following = async (userId, uid) => {
  console.log("userId" , userId )
  console.log("uid" , uid)
  try {
    const res = axios.put(
      `${baseURL}api/users/following/${userId}/${uid}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const unfollow = async (userId, uid) => {
  try {
    const res = axios.put(
      `${baseURL}api/users/unfollow/${userId}?unfollow=${uid}`
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const getFollowing = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}api/users/following/get/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getFollower = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}api/users/follower/get/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};
//following-whole user data
export const getUserFollowing = async(userId) => {
  try {
    const res = await axios.get(`${baseURL}api/users/following/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
}

//follower-whole data
export const getUserFollower = async(userId) => {
  try {
    const res = await axios.get(`${baseURL}api/users/followers/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
}

export const getNotinFollowing = async(userId) => {
  try {
    const res = await axios.get(`${baseURL}api/users/followingData/${userId}`);
    return res;
  } catch (error) {
    return null;
  }

}

export const savePost = async (data, userId) => {
  try {
    const res = await axios.post(`${baseURL}api/post/posts/${userId}`, {
      ...data,
    });
    console.log(res);
    return (await res).data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPost = async () => {
  try {
    const res = await axios.get(`${baseURL}api/post/posts`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPostOfUser = async (userId) => {
  try {
    console.log("get all post user id ",userId)
    const res = await axios.get(`${baseURL}api/post/posts/user/${userId}`);
    console.log("get all post of user ",res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPostById = async (postId) => {
  try {
    const res = axios.get(`${baseURL}api/post/posts/${postId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const postLike = async (postId, data) => {
  try {
    const res = axios.post(`${baseURL}api/post/posts/${postId}/like`, {
      ...data,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const postUnlike = async (postId, data) => {
  try {
    const res = axios.post(`${baseURL}api/post/posts/${postId}/unlike`, {
      ...data,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const updatePost = async (postId, image, caption) => {
  try {
    const res = axios.put(`${baseURL}api/post/posts/${postId}`, {
      data: { image: image, caption: caption },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const deletePostById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/post/posts/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const saveComment = async (userId, postId, data) => {
  try {
    console.log("apiUser", userId, "apupost", postId, "apidata", data);
    const res = await axios.post(
      `${baseURL}api/comment/comments/${userId}/${postId}`,
      { ...data }
    );
    console.log("indexapi", res);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllComment = async (postId) => {
  console.log("postId-c" , postId)
  try {
    const res = await axios.get(`${baseURL}api/comment/comments/${postId}`);
    console.log("res-c" , res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCommentById = async (postId) => {
  try {
    const res = await axios.get(`${baseURL}api/comment/comments/post/${postId}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateComment = async (commentId, text) => {
  try {
    const res = await axios.put(`${baseURL}api/comment/comments/${commentId}`, {
      data: { text: text },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteCommentById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}api/comment/comments/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
