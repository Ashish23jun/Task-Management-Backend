import prisma from "../config/db";

export const getSortedTasksService = async (sortBy: string, order: string) => {
  const validSortFields = ["startTime", "endTime", "priority"];
  if (!validSortFields.includes(sortBy)) {
    throw new Error("Invalid sort field");
  }

  return await prisma.task.findMany({
    orderBy: { [sortBy]: order === "desc" ? "desc" : "asc" },
  });
};
export const getTasksByPriority = async (priority: string) => {
  const priorityNum = parseInt(priority);
  if (isNaN(priorityNum) || priorityNum < 1 || priorityNum > 5) {
    throw new Error("Invalid priority value. Use 1-5");
  }

  return await prisma.task.findMany({
    where: { priority: priorityNum },
  });
};
export const getTasksByStatus = async (status: string) => {
  if (status !== "Pending" && status !== "Finished") {
    throw new Error("Invalid status value. Use pending or finished");
  }
  return await prisma.task.findMany({
    where: { status },
  });
};
