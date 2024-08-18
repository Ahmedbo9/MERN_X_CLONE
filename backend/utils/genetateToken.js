import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    sameSite: "strict", // cookie will only be sent in same-site requests , not cross-site requests , protect from CSRF
    httpOnly: true, // cookie cannot be accessed by client side javascript, only by server
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === "production" ? true : false, // cookie will only be sent in production
  });
};
