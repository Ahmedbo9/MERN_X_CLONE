import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectToDB } from "./database/connectDB.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
