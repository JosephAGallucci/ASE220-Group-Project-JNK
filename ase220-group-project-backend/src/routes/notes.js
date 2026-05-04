import { Router } from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";

const router = Router();

// turns a mongoose note doc into the json shape we send back
function shape(n) {
  const obj = {};
  obj.id = n._id.toString();
  obj.title = n.title;
  obj.content = n.content;
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

  // bail if it's not a real mongo id
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
// TODO: hook this up to the logged-in user later
router.post("/", async function (req, res) {
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
  });

  res.status(201).json(shape(note));
});

export default router;
