const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-service:27017/leaderboard";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const scoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true, trim: true },
  score: { type: Number, required: true },
  game: { type: String, default: "VOID STRIKE" },
  createdAt: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

// Routes

// GET top 10 scores
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

// POST new score
app.post("/api/scores", async (req, res) => {
  try {
    const { playerName, score, game } = req.body;
    if (!playerName || score === undefined) {
      return res.status(400).json({ error: "playerName and score are required" });
    }
    const newScore = new Score({ playerName, score, game });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// DELETE score by id
app.delete("/api/scores/:id", async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ message: "Score deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete score" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", version: process.env.APP_VERSION || "1.0" });
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Leaderboard server running on port ${PORT}`);
});
