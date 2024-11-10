import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  notes: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  topic: {
    type: String,
    required: true,
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
  tags: { type: [String], default: [] },
  createdDate: {
    type: Date,
    required: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Question", QuestionSchema);
