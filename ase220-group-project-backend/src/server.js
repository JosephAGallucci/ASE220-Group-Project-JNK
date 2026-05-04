import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./routes/notes.js";
import userRouter from "./routes/user.js";

// TODO: move config to a file later maybe
let PORT = process.env.PORT;
if (!PORT) {
  PORT = 3000;
}

let MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  MONGO_URI = "mongodb://localhost:27017/notes";
}

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/health", function (req, res) {
  res.json({ ok: true });
});

app.use("/API/notes", notesRouter);
app.use("/API/user", userRouter);

// connect to mongo, then start server
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongo connected");
    app.listen(PORT, function () {
      console.log("server on " + PORT);
    });
  } catch (err) {
    console.log("mongo failed:", err.message);
    process.exit(1);
  }
}

start();
