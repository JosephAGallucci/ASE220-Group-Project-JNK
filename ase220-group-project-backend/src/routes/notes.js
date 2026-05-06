import { Router } from "express";
import mongoose from "mongoose";

import Note from "../models/Note.js";
import { requireAuth } from "../middleware/auth.js";


const router = Router();


// turns a mongoose note doc into the json shape we send back
function shape(n) {
  const obj = {};

  obj.id = n._id.toString();
  obj.title = n.title;
  obj.content = n.content;

  //some old notes might not have an owner
  if (n.owner) {
    obj.owner = n.owner.toString();
  } else {
    obj.owner = "";
  }

  obj.tag = n.tag;

  return obj;
}


// GET /API/notes
router.get("/", async function (req, res) {
  const notes = await Note.find();

  const out = [];

  for (let i = 0; i < notes.length; i++) {
    out.push(shape(notes[i]));
  }

  res.json(out);
});


// GET /API/notes/:id
router.get("/:id", async function (req, res) {
  const id = req.params.id;

  //bail if it's not a real mongo id
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }

  res.json(shape(note));
});


// POST /API/notes
router.post("/", requireAuth, async function (req, res) {
  const body = req.body;

  if (!body) {
    res.status(400).json({ error: "title required" });
    return;
  }


  const title = body.title;

  if (!title) {
    res.status(400).json({ error: "title required" });
    return;
  }


  let content = body.content;

  if (!content) {
    content = "";
  }


  let tag = body.tag;

  if (!tag) {
    tag = "";
  }


  const note = await Note.create({
    title: title,
    content: content,
    tag: tag,
    owner: req.user.id,
  });

  res.status(201).json(shape(note));
});


// PATCH /API/notes/:id
router.patch("/:id", requireAuth, async function (req, res) {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ error: "Note not found" });
    return;
  }


  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }


  //only the owner can update
  if (note.owner.toString() !== req.user.id) {
    res.status(403).json({ error: "You do not have permission to update this note" });
    return;
  }


  const body = req.body;

  if (!body) {
    res.status(400).json({ error: "no fields to update" });
    return;
  }


  //at least one field has to be present
  let changed = false;

  if (typeof body.title === "string") {
    if (!body.title) {
      res.status(400).json({ error: "title cannot be empty" });
      return;
    }
    note.title = body.title;
    changed = true;
  }

  if (typeof body.content === "string") {
    note.content = body.content;
    changed = true;
  }

  if (typeof body.tag === "string") {
    note.tag = body.tag;
    changed = true;
  }


  if (!changed) {
    res.status(400).json({ error: "no fields to update" });
    return;
  }


  await note.save();

  res.json(shape(note));
});


// DELETE /API/notes/:id
router.delete("/:id", requireAuth, async function (req, res) {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ error: "Note not found" });
    return;
  }


  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({ error: "Note not found" });
    return;
  }


  //only the owner can delete the note
  if (note.owner.toString() !== req.user.id) {
    res.status(403).json({ error: "You do not have permission to delete this note" });
    return;
  }


  await note.deleteOne();

  res.json({ message: "Note deleted successfully" });
});


export default router;
