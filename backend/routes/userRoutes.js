import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

//route: /api/users

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);

export default router;
