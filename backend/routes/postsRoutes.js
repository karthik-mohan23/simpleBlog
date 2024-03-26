import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello User" });
});
router.post("/", (req, res) => {
  res.status(200).json({ message: "Post method" });
});

export default router;
