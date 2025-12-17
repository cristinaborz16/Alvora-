import express from "express";
import { Group } from "../models/Group.js";
import { GroupMember } from "../models/GroupMember.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL GROUPS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    const groupIds = groups.map(g => g._id);

    const members = await GroupMember.find({ group_id: { $in: groupIds } });
    const memberMap = new Map();
    members.forEach(m => {
      if (!memberMap.has(m.group_id.toString())) {
        memberMap.set(m.group_id.toString(), []);
      }
      memberMap.get(m.group_id.toString()).push(m.user_id.toString());
    });

    const formattedGroups = groups.map((g) => {
      const groupMembers = memberMap.get(g._id.toString()) || [];
      return {
        id: g._id.toString(),
        name: g.name,
        faculty: g.faculty,
        year: g.year,
        course: g.course,
        description: g.description,
        member_count: groupMembers.length,
        is_member: groupMembers.includes(req.user.id),
        created_by: g.created_by.toString(),
        created_at: g.createdAt,
        updated_at: g.updatedAt,
      };
    });

    res.json(formattedGroups);
  } catch (err) {
    console.error("Get groups error:", err);
    res.status(500).json({ message: "Failed to fetch groups." });
  }
});

// GET GROUP BY ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    res.json({
      id: group._id.toString(),
      name: group.name,
      faculty: group.faculty,
      year: group.year,
      course: group.course,
      description: group.description,
      created_by: group.created_by.toString(),
      created_at: group.createdAt,
      updated_at: group.updatedAt,
    });
  } catch (err) {
    console.error("Get group error:", err);
    res.status(500).json({ message: "Failed to fetch group." });
  }
});

export default router;

