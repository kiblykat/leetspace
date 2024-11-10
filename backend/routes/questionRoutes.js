import express from "express";
import {
  getQuestion,
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestion);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
