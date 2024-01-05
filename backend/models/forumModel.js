import mongoose from "mongoose";
import ForumPost from "./forumPostModel.js";

const forumSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorID: {
      type: Object,
      required: true,
    },
    posts: { type: [ForumPost.schema] },
  },
  {
    timestamps: true,
  }
);

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;
