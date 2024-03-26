import express from "express";

import { createNewPost, getAllPosts } from "../controllers/postsController.js";

const router = express.Router();

router.post("/", createNewPost);

router.get("/", getAllPosts);

export default router;
