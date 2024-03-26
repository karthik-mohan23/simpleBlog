import express from "express";

import {
  createNewPost,
  getAllPosts,
  deletePost,
  updatePost,
} from "../controllers/postsController.js";

const router = express.Router();

router.post("/", createNewPost);

router.get("/", getAllPosts);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
