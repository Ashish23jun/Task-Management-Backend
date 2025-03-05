import express from "express";
import {
  getTaskCountsHandler,
  getTaskTimeMetricsHandler,
} from "../controllers/dashboardController";

const router = express.Router();

router.get("/status-count", getTaskCountsHandler);
router.get("/time-metrics", getTaskTimeMetricsHandler);

export default router;
