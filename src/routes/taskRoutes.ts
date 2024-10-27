import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/all", getTasks);
router.post("/add", createTask);
router.patch("/update/:taskId", updateTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;
