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
exports.getTasksWithFilters = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const db_1 = __importDefault(require("../config/db"));
const createTask = (userId, taskData) => __awaiter(void 0, void 0, void 0, function* () {
    if (taskData.priority < 1 || taskData.priority > 5) {
        throw new Error("Priority must be between 1 and 5");
    }
    const task = yield db_1.default.task.create({
        data: Object.assign(Object.assign({}, taskData), { status: taskData.status || "pending", userId }),
    });
    return task;
});
exports.createTask = createTask;
const getTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.task.findMany({
        where: { userId },
        orderBy: { startTime: "asc" },
    });
});
exports.getTasks = getTasks;
const updateTask = (taskId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTask = yield db_1.default.task.findUnique({ where: { id: taskId } });
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
    const updatedTask = yield db_1.default.task.update({
        where: { id: taskId },
        data: updates,
    });
    return updatedTask;
});
exports.updateTask = updateTask;
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTask = yield db_1.default.task.findUnique({ where: { id: taskId } });
    if (!existingTask) {
        throw new Error("Task not found");
    }
    yield db_1.default.task.delete({ where: { id: taskId } });
    return { message: "Task deleted successfully" };
});
exports.deleteTask = deleteTask;
const getTasksWithFilters = (userId, page, limit, sortBy, order, priority, status) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const whereClause = { userId };
    if (priority) {
        whereClause.priority = priority;
    }
    if (status) {
        whereClause.status = status;
    }
    const totalTasks = yield db_1.default.task.count({ where: whereClause });
    const tasks = yield db_1.default.task.findMany({
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
});
exports.getTasksWithFilters = getTasksWithFilters;
