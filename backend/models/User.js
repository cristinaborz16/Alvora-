import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    },
    faculty: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

