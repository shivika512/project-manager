// models/Task.ts
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  dueDate: Date,
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);