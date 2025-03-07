import express from "express";
import { getSortedTasks } from "../controllers/sortController";

const router = express.Router();

router.get("/sortByTime", getSortedTasks);

export default router;
