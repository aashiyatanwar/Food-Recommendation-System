const router = require("express").Router();
const comment = require("../models/comment");

router.post("/comments/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  //console.log("userID", userId);

  const postId = req.params.postId;
  //console.log("postID", postId);

  try {
    const newComment = comment({
      user: userId,
      post: postId,
      text: req.body.text,
    });

    const savedComment = await newComment.save();
    res.status(200).send({ comment: savedComment });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Get all comments
router.get("/comments/:postId", async (req, res) => {
  const postId = { post: req.params.postId };
  try {
    const comments = await comment.find(postId);
    console.log("comments", comments);
    res.status(200).send({ success: true, comments });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Get comments for a specific post
router.get("/comments/post/:postId", async (req, res) => {
  try {
    const filter = { _id: req.params.postId };
    const options = {
      upsert: true,
      new: true,
    };
    const result = await comment.findOne({ _id: filter }).populate("user post");
    res.status(200).send({ success: true, comment: result });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Update a comment by ID
router.put("/comments/:commentId", async (req, res) => {
  const filter = { _id: req.params.commentId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await post.findOneAndUpdate(
      filter,
      {
        text: req.body.text,
      },

      options
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    res.status(200).send({ success: true, comment: result });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Delete a comment by ID
router.delete("/comments/:commentId", async (req, res) => {
  const filter = { _id: req.params.commentId };
  console.log("comment", filter);

  const result = await comment.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

module.exports = router;
