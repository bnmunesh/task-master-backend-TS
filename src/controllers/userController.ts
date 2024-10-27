import { Request, Response } from "express";
import { User } from "../database/models";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await User.find();
        if (data.length === 0) {
            res.status(404).json({ message: "No users found" });
        } else {
            res.status(200).json(data);
        }
    } catch (error: any) {
        console.error("Error retrieving users:", error);
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;    

    if (!username || !password || !email) {
        res.status(400).json({ message: "Username/password/email are required" });
        return;
    }

    try {
        const data = await User.create({ username, password, email });
        res.status(201).json(data);
    } catch (error: any) {
        console.error("Error creating user:", error);        
        res
            .status(500)
            .json({ message: `Error creating user: ${error.message}` });
    }
}