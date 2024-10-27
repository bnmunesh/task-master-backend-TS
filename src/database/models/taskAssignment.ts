import mongoose, { Schema, model } from "mongoose";

const taskAssignmentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskAssignment = model("TaskAssignment", taskAssignmentSchema);

export default TaskAssignment;
