import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

// create JWT
// 3 parts
// Header {algorithm}
// payload {data we include}
// signature - signature jwt uses to verify authenticity of this  jwt string

const createToken = (id) => {
  // payload, secret key, options
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  //   check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email is already taken" });
  }
  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    // creating token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  //   check if email already exists
  const userExists = await User.findOne({ email });
  // if no user of this email return
  if (!userExists) {
    console.log("Incorrect email");
    return res.status(400).json({ error: "Invalid credentials" });
  }
  // check password
  const match = await bcrypt.compare(password, userExists.password);
  if (!match) {
    console.log("Incorrect password");
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    // creating token
    const token = createToken(userExists._id);
    res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export { registerUser, loginUser };
