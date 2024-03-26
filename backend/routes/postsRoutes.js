import express from "express";

import {
  createNewPost,
  getAllPosts,
  deletePost,
  updatePost,
  getUserPosts,
} from "../controllers/postsController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", authMiddleware, getUserPosts);
router.post("/", authMiddleware, createNewPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);

export default router;
