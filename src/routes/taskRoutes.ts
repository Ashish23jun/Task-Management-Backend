import express from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../controllers/taskController";
import { authenticateUser } from "../middleware.ts/authMiddleware";

const router = express.Router();
router.post("/", authenticateUser, createTaskHandler);
router.get("/", authenticateUser, getTasksHandler);
router.patch("/:taskId", updateTaskHandler);
router.delete("/:taskId", deleteTaskHandler);

export default router;
