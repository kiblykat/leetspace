import express from "express";
import {
  getCompleted,
  createCompleted,
  getAllCompleteds,
  updateCompleted,
  deleteCompleted,
  getDueCompleteds,
} from "../controllers/completedController.js";

//route: /api/completed

const router = express.Router();

router.get("/:uid", getAllCompleteds);
router.get("/due/:uid", getDueCompleteds);
router.get("/:id", getCompleted);
router.post("/create", createCompleted);
router.post("/update", updateCompleted);
router.delete("/:id", deleteCompleted);

export default router;
