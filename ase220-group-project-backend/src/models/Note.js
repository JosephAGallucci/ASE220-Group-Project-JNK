import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },

  //owner is the user id of whoever made the note
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  tag: { type: String, default: "" },
});


export default mongoose.model("Note", noteSchema);
