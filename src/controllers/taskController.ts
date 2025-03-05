import { Request, Response } from "express";
import { createTask, getTasks, updateTask } from "../services/taskService";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { title, startTime, endTime, priority } = req.body;

    if (!title || !startTime || !priority) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const task = await createTask(req.user.id, {
      title,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : undefined,
      priority: Number(priority),
    });

    res.status(201).json(task);
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

    const tasks = await getTasks(req.user.id); // ✅ Fetch tasks for logged-in user
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

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
