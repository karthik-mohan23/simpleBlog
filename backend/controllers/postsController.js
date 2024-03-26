import mongoose from "mongoose";
import Post from "../models/postModel.js";

// get->/api/posts
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    return res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// post->/api/posts
const createNewPost = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newPost = await Post.create({
      title,
      body,
    });

    res.status(201).json({ success: "Post created", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// delete->/api/posts/:id
const deletePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("invalid post id to delete");
    return res
      .status(400)
      .json({ error: "Something went wrong. Cannot delete post." });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Post not found." });
  }

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(201).json({ success: "post was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// put->api/posts/:id
const updatePost = async (req, res) => {
  // id from url and body from req
  // we need data from body
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }
  // check if id in the url is valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("invalid post id to update");
    return res
      .status(400)
      .json({ error: "Something went wrong. Cannot update post." });
  }

  try {
    await Post.findOneAndUpdate(
      { _id: id },
      { title, body },
      {
        new: true,
      }
    );
    res.status(201).json({ success: "post updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllPosts, createNewPost, deletePost, updatePost };
