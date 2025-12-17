import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export default async function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No authentication token provided." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format. Use: Bearer <token>" });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      faculty: user.faculty
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}