import mongoose from "mongoose";

const completedSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  notes: { type: String, default: "" },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"],
  },
  topic: {
    type: String,
    enum: [
      "Arrays and Hashing",
      "Two Pointers",
      "Stack",
      "Binary Search",
      "Sliding Window",
      "Linked List",
      "Trees",
      "Tries",
      "Backtracking",
      "Heap/Priority Queue",
      "Graphs",
      "1-D DP",
      "Intervals",
      "Greedy",
      "Advanced Graphs",
      "2-D DP",
      "Bit Manipulation",
      "Math & Geometry",
    ],
  },
  tags: { type: String, default: "[]" },
  createdDate: {
    type: Date,
    required: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
  reviewCount: {
    type: Number,
    required: true,
  },
  //this tracks how long before next revisit. difficulty multiplier applies to this val
  currentInterval: {
    type: Number,
    required: true,
  },
});

completedSchema.index({ uid: 1, title: 1 }, { unique: true });
export const completedModel = mongoose.model("Completed", completedSchema);
