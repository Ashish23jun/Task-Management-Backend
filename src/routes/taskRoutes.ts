import express from "express";
import {
  createTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../controllers/taskController";

const router = express.Router();
router.post("/", createTaskHandler);
router.get("/", getTasksHandler);
router.patch("/:taskId", updateTaskHandler);
export default router;
