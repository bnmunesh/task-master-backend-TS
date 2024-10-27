import mongoose, { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    teamName: { type: String, required: true },
    teamOwnerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);


const Team = model("Team", teamSchema);

export default Team;
