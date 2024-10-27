import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    projectTeams: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProjectTeam" },
    ],
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;
