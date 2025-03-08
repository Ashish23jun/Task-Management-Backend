"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksHandler = exports.deleteTaskHandler = exports.updateTaskHandler = exports.createTaskHandler = void 0;
const taskService = __importStar(require("../services/taskService"));
const taskService_1 = require("../services/taskService");
const createTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const task = yield (0, taskService_1.createTask)(req.user.id, {
            title,
            startTime: new Date(startTime),
            endTime: endTime ? new Date(endTime) : undefined,
            priority: Number(priority),
            status,
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTaskHandler = createTaskHandler;
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
const updateTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const updates = req.body;
        const updatedTask = yield (0, taskService_1.updateTask)(taskId, updates);
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTaskHandler = updateTaskHandler;
const deleteTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const result = yield (0, taskService_1.deleteTask)(taskId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTaskHandler = deleteTaskHandler;
const getTasksHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy; // Example: "startTime"
        const order = req.query.order; // Example: "asc" or "desc"
        const priority = req.query.priority
            ? parseInt(req.query.priority)
            : undefined;
        const status = req.query.status; // Example: "pending" or "finished"
        const data = yield taskService.getTasksWithFilters(userId, page, limit, sortBy, order, priority, status);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTasksHandler = getTasksHandler;
