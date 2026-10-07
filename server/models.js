const mongoose = require("mongoose");

const Event = mongoose.model("Event", new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  venue: String,
  category: String,
}));

const Announcement = mongoose.model("Announcement", new mongoose.Schema({
  title: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
}));

module.exports = { Event, Announcement };
