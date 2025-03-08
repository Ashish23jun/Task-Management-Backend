"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware.ts/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.authenticateUser, taskController_1.createTaskHandler);
router.get("/", authMiddleware_1.authenticateUser, taskController_1.getTasksHandler);
router.patch("/:taskId", taskController_1.updateTaskHandler);
router.delete("/:taskId", taskController_1.deleteTaskHandler);
exports.default = router;
