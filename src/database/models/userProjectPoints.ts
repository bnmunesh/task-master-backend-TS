import mongoose, { Schema, model } from "mongoose";

const userProjectPointsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserProjectPoints = model("UserProjectPoints", userProjectPointsSchema);

export default UserProjectPoints;
