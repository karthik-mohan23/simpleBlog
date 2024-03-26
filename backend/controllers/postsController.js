import Post from "../models/postModel.js";

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    return res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

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

export { getAllPosts, createNewPost };
