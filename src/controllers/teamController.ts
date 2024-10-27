import { Request, Response } from "express";
import { Project, Team } from "../database/models";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate("productOwnerUserId", "username")
      .populate("projectManagerUserId", "username");

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }

    const data = teams.map((team: any) => ({
      ...team.toObject(),
      productOwnerUsername: team.productOwnerUserId?.username,
      projectManagerUsername: team.projectManagerUserId?.username,
    }));

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching teams:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { teamName, teamOwnerUserId, users, projectId } = req.body;

  if (!teamName || !teamOwnerUserId || !users || !projectId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const team = await Team.create({
      teamName,
      projectId,
      teamOwnerUserId,
      users,
    });

    await Project.findByIdAndUpdate(projectId, {
      $push: { projectTeams: team._id },
    });

    res.status(201).json(team);
  } catch (error: any) {
    console.error("Error creating team:", error.message);
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });  
  }
};
