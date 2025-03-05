import { Request, Response } from "express";
import { getTaskCounts, getTaskTimeMetrics } from "../services/dashboardService";

export const getTaskCountsHandler = async (req: Request, res: Response) => {
  try {
    const result = await getTaskCounts();
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
    const result = await getTaskTimeMetrics();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
