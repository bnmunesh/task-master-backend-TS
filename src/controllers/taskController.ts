import { Request, Response } from "express";
import { Task } from "../database/models";

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;

  if (!projectId) {
    res.status(400).json({ message: "Project ID is required" });
    return;
  }

  try {
    const data = await Task.find({ projectId })
      .populate("authorUserId", "username")
      .populate("assignedUserId", "username")
      .populate("comments")
      .populate("attachments");

    if (data.length === 0) {
      res.status(404).json({ message: "No tasks found for the given project" });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error retrieving tasks:", error.message);

    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Project ID format" });
      return;
    }

    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;

  if (!title || !projectId || !authorUserId) {
    res
      .status(400)
      .json({ message: "Title, Project ID, and Author User ID are required" });
    return;
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error: any) {
    console.error("Error creating task:", error.message);

    if (error.name === "ValidationError") {
      res.status(400).json({ message: `Validation Error: ${error.message}` });
    } else {
      res
        .status(500)
        .json({ message: `Error creating a task: ${error.message}` });
    }
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ message: "Status is required" });
    return;
  }

  try {
    const data = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );

    if (!data) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error updating task:", error.message);

    if (error.name === "CastError") {
      res.status(400).json({ message: `Invalid task ID: ${error.message}` });
    } else {
      res
        .status(500)
        .json({ message: `Error updating task: ${error.message}` });
    }
  }
};

export const getUserTasks = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const data = await Task.find({
      $or: [{ authorUserId: userId }, { assignedUserId: userId }],
    })
      .populate("authorUserId", "username")
      .populate("assignedUserId", "username");

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error retrieving user tasks:", error.message);

    if (error.name === "CastError") {
      res.status(400).json({ message: `Invalid user ID: ${error.message}` });
    } else {
      res
        .status(500)
        .json({ message: `Error retrieving user's tasks: ${error.message}` });
    }
  }
};
