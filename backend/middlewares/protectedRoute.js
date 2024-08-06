import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};
