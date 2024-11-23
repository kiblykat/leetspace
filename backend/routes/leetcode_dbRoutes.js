import express from "express";
import {
  getAllLeets,
  getMatchingLeets,
} from "../controllers/leetcode_dbController.js";

//route: api/leetcode_db

const router = express.Router();

router.get("/", getAllLeets);
router.post("/find-matching", getMatchingLeets);

export default router;
