"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = require("../controllers/dashboardController");
const router = express_1.default.Router();
router.get("/status-count", dashboardController_1.getTaskCountsHandler);
router.get("/time-metrics", dashboardController_1.getTaskTimeMetricsHandler);
exports.default = router;
