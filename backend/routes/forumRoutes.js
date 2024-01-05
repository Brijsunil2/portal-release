import express from "express";
const router = express.Router();
import { getForums, createForum, getForum } from "../controllers/forumControllers.js";

router.get("/", getForums);
router.post("/create-forum", createForum);
router.get("/forum/:id", getForum);

export default router;
