import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import completedRoutes from "./routes/completedRoutes.js";
import leetcodeDBRoutes from "./routes/leetcode_dbRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB(); //connect to mongoDB database

const app = express();
app.use(express.json());
app.use(cors());

// completed routes
app.use("/api/completed", completedRoutes);
app.use("/api/leetcode_db", leetcodeDBRoutes);
app.use("api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
