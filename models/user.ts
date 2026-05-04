// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["ADMIN", "MEMBER"],
    default: "MEMBER",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);