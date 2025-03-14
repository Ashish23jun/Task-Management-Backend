import { Request, Response } from "express";
import * as taskService from "../services/taskService";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { title, startTime, endTime, priority, status } = req.body;

    if (!title || !startTime || !priority) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const task = await createTask(req.user.id, {
      title,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : undefined,
      priority: Number(priority),
      status,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const getTasksHandler = async (req: Request, res: Response) => {
//   try {
//     if (!req.user) {
//       res.status(401).json({ error: "Unauthorized" });
//       return;
//     }

//     const tasks = await getTasks(req.user.id);
//     res.json(tasks);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await updateTask(taskId, updates);

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const result = await deleteTask(taskId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasksHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as string; // Example: "startTime"
    const order = req.query.order as string; // Example: "asc" or "desc"
    const priority = req.query.priority
      ? parseInt(req.query.priority as string)
      : undefined;
    const status = req.query.status as string; // Example: "pending" or "finished"

    const data = await taskService.getTasksWithFilters(
      userId,
      page,
      limit,
      sortBy,
      order,
      priority,
      status
    );

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
