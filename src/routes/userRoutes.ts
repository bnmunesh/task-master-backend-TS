import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";
const router = Router();

router.get("/getUser", getUsers);
router.post("/createUser", createUser);

export default router;
