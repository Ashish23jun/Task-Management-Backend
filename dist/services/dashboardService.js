"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskTimeMetrics = exports.getTaskCounts = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTaskCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalTasks = yield db_1.default.task.count();
    const finishedTasks = yield db_1.default.task.count({
        where: { status: "Finished" },
    });
    const pendingTasks = yield db_1.default.task.count({
        where: { status: "Pending" },
    });
    return { totalTasks, finishedTasks, pendingTasks };
});
exports.getTaskCounts = getTaskCounts;
const getTaskTimeMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield db_1.default.task.findMany();
    const now = new Date();
    let totalTimeTaken = 0;
    let totalTimeLapsed = 0;
    let totalRemainingTime = 0;
    tasks.forEach((task) => {
        const startTime = new Date(task.startTime);
        const endTime = task.endTime ? new Date(task.endTime) : null;
        if (task.status === "Finished" && endTime) {
            // Total time taken = endTime - startTime
            totalTimeTaken +=
                (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert to hours
        }
        if (task.status === "Pending") {
            if (now > startTime) {
                // Time lapsed = currentTime - startTime
                totalTimeLapsed +=
                    (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            }
            if (task.endTime) {
                const estimatedEndTime = new Date(task.endTime);
                if (now < estimatedEndTime) {
                    // Remaining estimated time = endTime - currentTime
                    totalRemainingTime +=
                        (estimatedEndTime.getTime() - now.getTime()) / (1000 * 60 * 60);
                }
            }
        }
    });
    return {
        totalTimeTaken: Math.max(totalTimeTaken, 0),
        totalTimeLapsed: Math.max(totalTimeLapsed, 0),
        totalRemainingTime: Math.max(totalRemainingTime, 0),
    };
});
exports.getTaskTimeMetrics = getTaskTimeMetrics;
