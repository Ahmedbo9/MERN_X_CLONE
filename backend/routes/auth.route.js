import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
const authRoutes = express.Router();
export default authRoutes;

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);
