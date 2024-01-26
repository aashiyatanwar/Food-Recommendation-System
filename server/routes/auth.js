const router = require("express").Router();

const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    // checking user email already exists or not
    const userExists = await user.findOne({ user_id: decodeValue.user_id });

    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: "admin",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};


router.get("/getUsers", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };

  const cursor = await user.find(options);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.get("/getUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const options = {
    upsert: true,
    new: true,
  };

  const userExists = await user.find(filter);
  //console.log("userExists" , userExists)
  if (!userExists)
    return res.status(400).send({ success: false, msg: "Invalid User ID" });
  if (userExists) {
    res.status(200).send({ success: true, data: userExists });
  } else {
    res.status(200).send({ success: false, data: null });
  }
});

router.put("/follower/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const uid = req.query;
  console.log("Followers");
  console.log(filter, uid);

  try {
    const result = await user.updateOne(uid, {
      //user_id:req.params.userId,
      $push: { followers: filter },
      $push: { following: user_id },
    });
    res.status(200).send({ success: true, msg: "Follower added " });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.put("/following/:userId/:fid", async (req, res) => {
  const userId = req.params.userId; 
  const filter = { _id: req.params.userId };
  const uuid = { _id: req.params.fid };
  

  try {
    console.log(userId, uuid);
    const result = await user.updateOne(
      { _id: userId },
      { $push: { following: uuid } }
    );

    const result2 = await user.updateOne(
      { _id: uuid },
      { $push: { followers: filter } }
    );
    res.status(200).send({ success: true, msg: "Following added" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.put("/unfollow/:userId", async (req, res) => {
  const userId = req.params.userId; // Store the user ID
  const uid = req.query.unfollow;
  const uuid = { _id: uid };
  //console.log("b-uid" , uid)
  const filter2 = req.params.userId;
  const uid2 = req.query.unfollow;
  //console.log("filter2" , filter2 )
  //console.log("uid2" , uid2)
  // Assuming the ID is passed as a query parameter

  try {
    console.log(userId, uid);
    const result = await user.updateOne(
      { _id: userId },
      { $pull: { following: uuid } }
    );
    const result2 = await user.updateOne(
      { _id: uid2 },
      { $pull: { followers: filter2 } }
    );

    res.status(200).send({ success: true, msg: "Following removed" });
    //res.status(200).send({success:true , msg:"Followers removed"});
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get("/following/get/:userId", async (req, res) => {
  try {
    const userId = { _id: req.params.userId };
    const result = await user.findById(userId);

    // Assuming the 'following' field stores user references

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }
    //console.log("result" , result)
    
    res.send(result.following);
  } catch (error) {
    console.error("Error getting following:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
})

  router.get("/following/:userId", async (req, res) => {
    try {
      const userId = { _id: req.params.userId };
      const result = await user.findById(userId);
  
      // Assuming the 'following' field stores user references
  
      if (!result) {
        return res.status(404).send({ message: "User not found" });
      }
      //console.log("result" , result)
      const ids = result.following.map((item) => item._id)
      //console.log("ids" , ids)
      user.getFollowingData(ids).exec((err, followingData) => {
        if (err) {
          console.error("Error retrieving following data:", err);
          return;
        }
        res.send(followingData)
  
        //console.log("folowingData" , followingData);
      });
  
      
    } catch (error) {
      console.error("Error getting following:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/follower/get/:userId", async (req, res) => {
  try {
    const userId = { _id: req.params.userId };
    const result = await user.findById(userId);

    // Assuming the 'following' field stores user references

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }
    //console.log("result" , result)
    
    res.send(result.followers);
  } catch (error) {
    console.error("Error getting following:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
})

  router.get("/followers/:userId", async (req, res) => {
    try {
      const userId = { _id: req.params.userId };
      const result = await user.findById(userId);
  
      // Assuming the 'following' field stores user references
  
      if (!result) {
        return res.status(404).send({ message: "User not found" });
      }
      //console.log("result" , result)
      const ids = result.followers.map((item) => item._id)
      //console.log("ids" , ids)
      user.getFollowingData(ids).exec((err, followingData) => {
        if (err) {
          console.error("Error retrieving following data:", err);
          return;
        }
        res.send(followingData)
  
        //console.log("folowingData" , followingData);
      });
  
      
    } catch (error) {
      console.error("Error getting following:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/followingData/:userId', async (req, res) => {
  try {
    const userId = { _id: req.params.userId };
    console.log("userid" , userId)
    const result = await user.findById(userId);
    console.log("result" , result)
   
    const followingIds = result.following.map((item) => item._id);
    console.log("followingids" , followingIds)

    const users = await user.getFollowing(followingIds);
    //console.log("users" , users)

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

module.exports = router;
