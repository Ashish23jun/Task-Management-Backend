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
