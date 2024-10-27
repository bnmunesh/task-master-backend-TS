import mongoose, { model, Schema } from "mongoose";

const projectTeamSchema = new Schema(
  {
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

const ProjectTeam = model("ProjectTeam", projectTeamSchema);

export default ProjectTeam;
// 