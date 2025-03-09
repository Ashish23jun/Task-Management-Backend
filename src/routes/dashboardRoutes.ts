import express from "express";
import {
  getTaskCountsHandler,
  getTaskTimeMetricsHandler,
} from "../controllers/dashboardController";
import { authenticateUser } from "../middleware.ts/authMiddleware";

const router = express.Router();

router.get("/task-counts", authenticateUser, getTaskCountsHandler);
router.get("/task-metrics", authenticateUser, getTaskTimeMetricsHandler);

export default router;
