import express from "express";
import { getAllLeets } from "../controllers/leetcode_dbController.js";

const router = express.Router();

router.get("/", getAllLeets);

export default router;
