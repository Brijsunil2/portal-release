import mongoose from "mongoose";

const forumPostSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorID: {
      type: String,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

export default ForumPost;