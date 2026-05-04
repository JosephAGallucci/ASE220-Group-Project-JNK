import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

// POST /API/user/register
router.post("/register", async function (req, res) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ error: "username and password required" });
    return;
  }

  const username = body.username;
  const password = body.password;

  if (!username || !password) {
    res.status(400).json({ error: "username and password required" });
    return;
  }

  // check if username already taken
  const existing = await User.findOne({ username: username });
  if (existing) {
    res.status(409).json({ error: "Username already exists" });
    return;
  }

  // hash the password before saving
  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    username: username,
    passwordHash: passwordHash,
  });

  res.status(201).json({ message: "User registered successfully" });
});

// POST /API/user/login
router.post("/login", async function (req, res) {
  const body = req.body;
  if (!body) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const username = body.username;
  const password = body.password;

  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  let passwordToCheck = password;
  if (!passwordToCheck) {
    passwordToCheck = "";
  }

  const ok = await bcrypt.compare(passwordToCheck, user.passwordHash);
  if (!ok) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  // return the jwt token
  const payload = {
    sub: user._id.toString(),
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ token: token });
});

export default router;
