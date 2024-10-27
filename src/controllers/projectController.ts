import { Request, Response } from "express";
import { Project } from "../database/models";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await Project.find();
    if (data.length === 0) {
      res.status(404).json({ message: "No projects found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error: any) {
    console.error("Error retrieving projects:", error);
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

  if (!name || !startDate) {
    res.status(400).json({ message: "Name and start date are required" });
    return;
  }

  try {
    const newProject = new Project({
      name,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error: any) {
    console.error("Error creating a project:", error);
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};
