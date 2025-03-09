import { Request, Response } from "express";
import {
  getTaskCounts,
  getTaskTimeMetrics,
} from "../services/dashboardService";

export const getTaskCountsHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const result = await getTaskCounts(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskTimeMetricsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const result = await getTaskTimeMetrics(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
