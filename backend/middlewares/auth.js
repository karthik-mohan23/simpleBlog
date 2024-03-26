import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../models/userModel.js";

// headers
// key -> value
// Authorization - Bearer dsfhsdhfl342

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // grab the token from headers
  const token = authorization.split(" ")[1];

  try {
    // decode and extract user id
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    // Save user in req body - remember this is a checkpoint
    // this happens before we actually handle a request
    const user = await User.findById(id);

    req.user = user._id;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "You are not authorized" });
  }
};

export default authMiddleware;
