import prisma from "../config/db";

export const getTaskCounts = async () => {
  const totalTasks = await prisma.task.count();
  const finishedTasks = await prisma.task.count({
    where: { status: "Finished" },
  });
  const pendingTasks = await prisma.task.count({
    where: { status: "Pending" },
  });

  return { totalTasks, finishedTasks, pendingTasks };
};

export const getTaskTimeMetrics = async () => {
  const tasks = await prisma.task.findMany();

  const now = new Date();
  let totalTimeTaken = 0;
  let totalTimeLapsed = 0;
  let totalRemainingTime = 0;

  tasks.forEach(
    (task: {
      status: string;
      id: string;
      title: string;
      startTime: Date;
      endTime: Date | null;
      priority: number;
      userId: string;
    }) => {
      const startTime = new Date(task.startTime);
      const endTime = task.endTime ? new Date(task.endTime) : null;

      if (task.status === "Finished" && endTime) {
        totalTimeTaken +=
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      }

      if (task.status === "Pending") {
        if (now > startTime) {
          totalTimeLapsed +=
            (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        }

        if (task.endTime) {
          const estimatedEndTime = new Date(task.endTime);
          if (now < estimatedEndTime) {
            totalRemainingTime +=
              (estimatedEndTime.getTime() - now.getTime()) / (1000 * 60 * 60);
          }
        }
      }
    }
  );

  return {
    totalTimeTaken: Math.max(totalTimeTaken, 0),
    totalTimeLapsed: Math.max(totalTimeLapsed, 0),
    totalRemainingTime: Math.max(totalRemainingTime, 0),
  };
};
