import { Request, Response } from "express";
import { Task, Project, User } from "../database/models";

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    res
      .status(400)
      .json({ message: "Query parameter is required and must be a string" });
    return;
  }

  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    const projects = await Project.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    const users = await User.find({
      username: { $regex: query, $options: "i" },
    });

    res.json({ tasks, projects, users });
  } catch (error: any) {
    console.error("Error performing search:", error.message);
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
