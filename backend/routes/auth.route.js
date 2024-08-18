import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
const authRoutes = express.Router();
export default authRoutes;

authRoutes.get("/signup", signup);

authRoutes.get("/login", login);

authRoutes.get("/logout", logout);
