import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
