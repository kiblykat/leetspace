import express from "express";
import {
  getCompleted,
  createCompleted,
  getAllCompleteds,
  updateCompleted,
  deleteCompleted,
  getDueCompleteds,
} from "../controllers/completedController.js";

const router = express.Router();

router.get("/", getAllCompleteds);
router.get("/due", getDueCompleteds);
router.get("/:id", getCompleted);
router.post("/create", createCompleted);
router.post("/update", updateCompleted);
router.delete("/:id", deleteCompleted);

export default router;
