import mongoose from "mongoose";

let leetcode_dbSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
  Question_No: { type: Number, required: true },
  Question: { type: String, required: true },
  Topic_tags: { type: [String], required: true },
  Acceptance_rate: { type: String, required: true },
  isPremium: { type: Boolean, required: true },
  Difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  Question_Link: { type: String, required: true },
  Solution: { type: String, required: true },
});

export const leetcode_dbModel = mongoose.model(
  "Leetcode_db",
  leetcode_dbSchema
);
