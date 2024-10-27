import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String },
    // profileUrl: { type: String },
    teamId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    authoredTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    // projectPoints: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "UserProjectPoints" },
    // ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
