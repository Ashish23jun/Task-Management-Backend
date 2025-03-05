import { Request, Response } from "express";
import { createTask, getTasks, updateTask } from "../services/taskService";

export const createTaskHandler = async (req: Request, res: Response) => {
  try {
    const { title, startTime, endTime, priority } = req.body;

    const task = await createTask({
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
    const tasks = await getTasks();
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
