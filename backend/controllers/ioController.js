import asyncHandler from "express-async-handler";
import ForumPost from "../models/forumPostModel.js";
import Forum from "../models/forumModel.js";

const socketOnDisconnect = () => {
  console.log("[Server]: A user disconnected");
};

const socketOnForumReply = asyncHandler(async (io, reply) => {
  const message = new ForumPost({
    author: reply.author,
    authorID: reply.authorID,
    msg: reply.msg,
  });

  Forum.findOne({ _id: reply.forumID }).then((found) => {
    found.posts.push(message);
    found.save().then((data) => {
      io.emit(`forumReplyUpdate/${found._id}`, data.posts.slice(-1)[0])
    });
  });
});

export { socketOnDisconnect, socketOnForumReply };
