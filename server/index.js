require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Event, Announcement } = require("./models");

const app = express();
app.use(cors());         // lets React (5173) talk to this server (5000)
app.use(express.json()); 


function adminOnly(req, res, next) {
  if (req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Not allowed" });
  }
  next();
}

// ---------- login ----------
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ message: "ok" });
  }
  res.status(401).json({ message: "Wrong username or password" });
});

// ---------- events ----------
app.get("/events", async (req, res) => {
  res.json(await Event.find().sort({ date: 1 }));
});

app.get("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

app.post("/events", adminOnly, async (req, res) => {
  res.status(201).json(await Event.create(req.body));
});

app.put("/events/:id", adminOnly, async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

app.delete("/events/:id", adminOnly, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ---------- announcements ----------
app.get("/announcements", async (req, res) => {
  res.json(await Announcement.find().sort({ createdAt: -1 }));
});

app.post("/announcements", adminOnly, async (req, res) => {
  res.status(201).json(await Announcement.create(req.body));
});

app.delete("/announcements/:id", adminOnly, async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ---------- start ----------
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log("Server on port " + process.env.PORT));
}).catch((err) => console.log("DB error:", err.message));
