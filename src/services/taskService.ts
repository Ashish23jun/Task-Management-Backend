import prisma from "../config/db";

export const createTask = async (
  userId: string,
  taskData: {
    title: string;
    startTime: Date;
    endTime?: Date;
    priority: number;
    status?: string;
  }
) => {
  if (taskData.priority < 1 || taskData.priority > 5) {
    throw new Error("Priority must be between 1 and 5");
  }

  const task = await prisma.task.create({
    data: {
      ...taskData,
      status: taskData.status || "pending",
      userId,
    },
  });

  return task;
};

export const getTasks = async (userId: string) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { startTime: "asc" },
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

  if (updates.startTime) {
    updates.startTime = new Date(updates.startTime);
  }

  if (updates.endTime) {
    updates.endTime = new Date(updates.endTime);
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

export const deleteTask = async (taskId: string) => {
  const existingTask = await prisma.task.findUnique({ where: { id: taskId } });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({ where: { id: taskId } });

  return { message: "Task deleted successfully" };
};

export const getTasksWithFilters = async (
  userId: string,
  page: number,
  limit: number,
  sortBy?: string,
  order?: string,
  priority?: number,
  status?: string
) => {
  const skip = (page - 1) * limit;

  const whereClause: any = { userId };

  if (priority) {
    whereClause.priority = priority;
  }

  if (status) {
    whereClause.status = status;
  }

  const totalTasks = await prisma.task.count({ where: whereClause });

  const tasks = await prisma.task.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: sortBy
      ? { [sortBy]: order === "desc" ? "desc" : "asc" }
      : { startTime: "asc" },
  });

  return {
    tasks,
    currentPage: page,
    totalPages: Math.ceil(totalTasks / limit),
    totalTasks,
  };
};
