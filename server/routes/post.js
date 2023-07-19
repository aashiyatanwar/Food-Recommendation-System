const router = require("express").Router();
const post = require("../models/post");
const currId = require("./currentUser");
const user = require("../models/user");


router.post("/posts/:userId", async (req, res) => {
  const filter = {_id : req.params.userId}
  console.log(filter)
  
  try {
    const newPost = post({
      images: req.body.images,
      Caption: req.body.Caption,
      user : filter
      
    });

    

    const savedPost = await newPost.save();
    res.status(200).send({ post: savedPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await post.find().populate("comments likes user");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/posts/user/:userId", async (req, res) => {
  try {
    const filter={user : req.params.userId}
    console.log(filter)
    const posts = await post.find(filter)
    console.log("posts" , posts)
    res.status(200).send({ success: true, posts });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Get a single post by ID
router.get("/posts/:postId", async (req, res) => {
  try {
    const filter = { _id: req.params.postId };
    const options = {
      upsert: true,
      new: true,
    };
    const postExist = await post
      .findOne({ _id: filter }, options)
      .populate("comments likes user");
    if (!postExist) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).send({ success: true, data: postExist });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Update a post by ID
router.put("/posts/:postId", async (req, res) => {
  const filter = { _id: req.params.postId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    //const { image, caption } = req.body;
    const newPost = await post.findOneAndUpdate(
      filter,
      {
        images: req.body.images,
        Caption: req.body.Caption,
      },

      options
    );
    if (!newPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).send({ success: true, post: newPost });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

// Delete a post by ID
router.delete("/posts/:postId", async (req, res) => {
  try {
    const filter = { _id: req.params.postId };

    const result = await post.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

router.post("/posts/:postId/like", async (req, res) => {
  try {
    const filter = { _id: req.params.postId };
    const options = {
      upsert: true,
      new: true,
    };

    const userId = req.body.userId;
    //console.log(filter)
    const result = await post.findOneAndUpdate(
      filter,
      { $push: { likes: userId } },
      options
    );

    res.status(200).json({ success: true, post: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/posts/:postId/unlike", async (req, res) => {
  try {
    const filter = { _id: req.params.postId };
    const options = {
      upsert: true,
      new: true,
    };
    const userId = req.body.userId;
    const result = await post.findOneAndUpdate(
      filter,
      { $pull: { likes: userId } },
      options
    );

    res.status(200).json({ success: true,  post : result});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
module.exports = router;
