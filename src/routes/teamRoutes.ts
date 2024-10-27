import { Router } from "express";
import { createTeam, getTeams } from "../controllers/teamController";

const router = Router();

router.get("/all", getTeams);
router.post("/add", createTeam);

export default router;
