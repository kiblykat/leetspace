import express from "express";
import {
  getAllLeets,
  getMatchingLeets,
} from "../controllers/leetcode_dbController.js";

const router = express.Router();

router.get("/", getAllLeets);
router.post("/find-matching", getMatchingLeets);

export default router;
