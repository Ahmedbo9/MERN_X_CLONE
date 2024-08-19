import express from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  getUserProfile,
  followUnfollowUser,
} from "../controllers/users.controller.js";
const userRoutes = express.Router();

userRoutes.get("/profile/:username", protectRoute, getUserProfile);
// userRoutes.get("/suggested", protectRoute, getUserProfile);
userRoutes.get("/follow/:id", protectRoute, followUnfollowUser);
// userRoutes.post("/update", protectRoute, updateUserProfile);
export default userRoutes;
