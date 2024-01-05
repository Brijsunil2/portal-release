import asyncHandler from "express-async-handler";
import Forum from "../models/forumModel.js";

const getForums = asyncHandler(async (req, res) => {
  const regex = new RegExp(req.query.title, "i");
  const forums = await Forum.aggregate()
    .match({ title: { $regex: regex } })
    .sort({createdAt: -1})
    .skip(10 * req.query.skip)
    .limit(10)
    .project({
      title: 1,
      desc: 1,
      author: 1,
      authorID: 1,
      createdAt: 1,
      updatedAt: 1,
      numPosts: { $size: "$posts" },
    });

  const count = await Forum.countDocuments({ title: { $regex: regex } });

  if (forums && count) {
    res.status(200).json({ count, forums });
  } else {
    res.status(500);
    throw new Error("Server is unable to find any forums");
  }
});

const createForum = asyncHandler(async (req, res) => {
  const { title, desc, author, authorID } = req.body;

  const forum = await Forum.create({
    title,
    desc,
    author,
    authorID,
  });

  if (forum) {
    res.status(201).json({
      _id: forum._id,
      title: forum.title,
      desc: forum.desc,
      author: forum.author,
      authorID: forum.authorID,
      createdAt: forum.createdAt,
    });
  } else {
    res.status(500);
    throw new Error("Server is unable to create a new forum");
  }
});

const getForum = asyncHandler(async (req, res) => {
  const forum = await Forum.findById({_id: req.params.id }).select("-__v").slice("posts", 20).exec();

  if (forum) {
    res.status(200).json({ forum });
  } else {
    res.status(500);
    throw new Error("Server cannot find forum, forum may not exist");
  }
});

export { getForums, createForum, getForum };
