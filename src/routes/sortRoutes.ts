import express from "express";
import {
  getSortedTasks,
  getTasksByPriority,
  getTasksByStatus,
} from "../controllers/sortController";

const router = express.Router();

router.get("/sortByTime", getSortedTasks);
router.get("/filter/priority", getTasksByPriority);
router.get("/filter/status", getTasksByStatus);

export default router;
