import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = Router();

router.get("/all", getProjects);
router.post("/add", createProject);

export default router;
