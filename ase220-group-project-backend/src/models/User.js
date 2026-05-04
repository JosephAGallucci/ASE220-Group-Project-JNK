import mongoose from "mongoose";

// users collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
