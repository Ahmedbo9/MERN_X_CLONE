import express from "express";
import {
  login,
  signup,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../utils/protectRoute.js";
const authRoutes = express.Router();
export default authRoutes;

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.get("/checkAuth", protectRoute, checkAuth);
