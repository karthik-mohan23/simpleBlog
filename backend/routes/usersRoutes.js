import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
const router = express.Router();

// Register user route
router.post("/register", registerUser);
// login user route
router.post("/login", loginUser);

export default router;
