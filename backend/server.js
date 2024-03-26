import express from "express";
import postsRoutes from "./routes/postsRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use("/api/posts", postsRoutes);

mongoose
  .connect("mongodb://localhost:27017/demo_db")
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => console.log("server running on PORT 3000"));
  })
  .catch((err) => console.log(err));
