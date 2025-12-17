import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const INSTITUTION_DOMAIN = process.env.INSTITUTION_DOMAIN || "@stud.rau.ro";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, faculty } = req.body;

    if (!email || !password || !fullName || !faculty) {
      return res.status(400).json({ message: "Complete all required fields." });
    }

    if (!email.endsWith(INSTITUTION_DOMAIN)) {
      return res.status(400).json({
        message: `Email must be institutional (${INSTITUTION_DOMAIN}).`
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      full_name: fullName,
      faculty
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        email: user.email,
        full_name: user.full_name,
        faculty: user.faculty
      },
      session: {
        access_token: token,
        expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        email: user.email,
        full_name: user.full_name,
        faculty: user.faculty
      },
      session: {
        access_token: token,
        expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed." });
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  res.json({ message: "Logout successful." });
});

// GET SESSION
router.get("/session", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No authentication token provided." });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        full_name: user.full_name,
        faculty: user.faculty
      }
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
});

export default router;