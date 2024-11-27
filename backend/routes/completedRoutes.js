import express from "express";
import {
  getSingleCompleted,
  createCompleted,
  getAllCompleteds,
  updateCompleted,
  deleteCompleted,
  getDueCompleteds,
  getEverySingleCompleteds,
} from "../controllers/completedController.js";

//route: /api/completed

const router = express.Router();

router.get("/single/:id", getSingleCompleted);
router.get("/due/:uid", getDueCompleteds);
router.get("/:uid", getAllCompleteds);
router.get("/", getEverySingleCompleteds);
router.post("/create", createCompleted);
router.post("/update", updateCompleted);
router.delete("/:id", deleteCompleted);

export default router;
