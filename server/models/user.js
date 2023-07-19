const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },

    email_verfied: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },

    followers: [
      {
        userId: String,
      },
    ],
    following: [
      {
        userId: String,
      },
    ],
    saved: [
      {
        postId: String,
      },
    ],


    auth_time: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
  
);

UserSchema.statics.getFollowingData = function (followingIds) {
  return this.aggregate([
    {
      $match: {
        _id: { $in: followingIds },
      },
    },
  ]);
};

UserSchema.statics.getFollowing = function (followingIds) {
  return this.aggregate([
    {
      $match: {
        _id: { $nin: followingIds },
      },
    },
  ]);
};


module.exports = mongoose.model("user", UserSchema);


