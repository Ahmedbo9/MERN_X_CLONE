import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    //get token from cookie
    const token = req.cookies.token;
    //check if token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized " });
    }
    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized " });
    }
    //get user details from token
    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "user not found " });
    }
    //set user in req object for further use in controllers
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
