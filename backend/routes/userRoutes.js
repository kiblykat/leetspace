import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

//route: /api/users

router.get("/:uid", getUser);
router.get("/", getAllUsers);
router.post("/create", createUser);

export default router;
