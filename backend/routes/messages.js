import express from "express";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET MESSAGES FOR A GROUP
router.get("/group/:groupId", authMiddleware, async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({ group_id: groupId })
      .sort({ createdAt: 1 });

    const userIds = [...new Set(messages.map((m) => m.user_id.toString()))];
    const users = await User.find({ _id: { $in: userIds } })
      .select("_id full_name email");

    const profileMap = new Map(users.map((u) => [u._id.toString(), {
      id: u._id.toString(),
      full_name: u.full_name,
      email: u.email,
    }]));

    const messagesWithProfiles = messages.map((m) => ({
      id: m._id.toString(),
      group_id: m.group_id.toString(),
      user_id: m.user_id.toString(),
      text: m.text,
      file_url: m.file_url,
      file_name: m.file_name,
      type: m.type,
      created_at: m.createdAt,
      profiles: profileMap.get(m.user_id.toString()) || { full_name: "Utilizator", email: "" },
    }));

    res.json(messagesWithProfiles);
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

// SEND MESSAGE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { group_id, text, file_url, file_name, type } = req.body;

    if (!group_id) {
      return res.status(400).json({ message: "Group ID is required." });
    }

    if (!text && !file_url) {
      return res.status(400).json({ message: "Message text or file is required." });
    }

    const message = await Message.create({
      group_id,
      user_id: req.user.id,
      text: text?.trim() || null,
      file_url: file_url || null,
      file_name: file_name || null,
      type: type || "text",
    });

    const user = await User.findById(req.user.id).select("full_name email");

    const messageWithProfile = {
      id: message._id.toString(),
      group_id: message.group_id.toString(),
      user_id: message.user_id.toString(),
      text: message.text,
      file_url: message.file_url,
      file_name: message.file_name,
      type: message.type,
      created_at: message.createdAt,
      profiles: user ? {
        id: user._id.toString(),
        full_name: user.full_name,
        email: user.email,
      } : { full_name: "Utilizator", email: "" },
    };

    res.status(201).json({
      message: "Message sent successfully.",
      data: messageWithProfile,
    });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

export default router;

