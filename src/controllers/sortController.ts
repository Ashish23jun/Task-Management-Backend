import { Request, Response } from "express";
import { getSortedTasksService } from "../services/sortService";
import * as sortService from "../services/sortService";

export const getSortedTasks = async (req: Request, res: Response) => {
  try {
    const { sortBy = "startTime", order = "asc" } = req.query;

    const tasks = await getSortedTasksService(
      sortBy as string,
      order as string
    );
    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getTasksByPriority = async (req: Request, res: Response) => {
  try {
    const { priority } = req.query;
    const tasks = await sortService.getTasksByPriority(priority as string);
    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getTasksByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const tasks = await sortService.getTasksByStatus(status as string);
    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
