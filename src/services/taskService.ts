import prisma from "../config/db";

export const createTask = async (
  userId: string,
  taskData: {
    title: string;
    startTime: Date;
    endTime?: Date;
    priority: number;
  }
) => {
  if (taskData.priority < 1 || taskData.priority > 5) {
    throw new Error("Priority must be between 1 and 5");
  }

  const task = await prisma.task.create({
    data: { ...taskData, status: "pending", userId }, // ✅ Associate task with user
  });

  return task;
};

export const getTasks = async (userId: string) => {
  return await prisma.task.findMany({
    where: { userId }, // ✅ Fetch only the logged-in user's tasks
    orderBy: { startTime: "asc" }, // Sort tasks by start time
  });
};

export const updateTask = async (taskId: string, updates: any) => {
  const existingTask = await prisma.task.findUnique({ where: { id: taskId } });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (updates.priority && (updates.priority < 1 || updates.priority > 5)) {
    throw new Error("Priority must be between 1 and 5");
  }

  if (updates.status === "finished" && existingTask.status !== "finished") {
    updates.endTime = new Date();
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: updates,
  });

  return updatedTask;
};
