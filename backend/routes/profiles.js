import express from "express";
import { User } from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET CURRENT USER PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.json({
      id: user._id.toString(),
      full_name: user.full_name,
      email: user.email,
      faculty: user.faculty,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile." });
  }
});

// GET ALL PROFILES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ full_name: 1 });

    const profiles = users.map(u => ({
      id: u._id.toString(),
      full_name: u.full_name,
      email: u.email,
      faculty: u.faculty,
    }));

    res.json(profiles);
  } catch (err) {
    console.error("Get profiles error:", err);
    res.status(500).json({ message: "Failed to fetch profiles." });
  }
});

export default router;

