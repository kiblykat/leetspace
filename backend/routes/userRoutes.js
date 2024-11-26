import express from "express";
import { getUsers } from "../controllers/userController.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

//route: /api/completed

router.get("/", getUsers);
router.post("/", createUser);

export default router;
