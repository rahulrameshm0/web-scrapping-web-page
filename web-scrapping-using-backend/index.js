require("dotenv").config();
const API_KEY = process.env.API_KEY;

const express = require("express");
const path = require("path");
const fs = require("fs");
const { excelFile } = require("child_process");
const { getJson } = require("serpapi");
const { error } = require("console");
const { json } = require("stream/consumers");

const app = express();
const port = 3000;
const api_key = API_KEY;
const DWONLOADS_DIR = path.join(__dirname, "downloads");

if (!fs.existsSync(DWONLOADS_DIR)) {
  fs.makdirSync(DWONLOADS_DIR);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloads", express.static(DWONLOADS_DIR));

app.get("/api/search", (req, res) => {
  const { q, count = 5 } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  getJson(
    {
      engine: "google_short_videos",
      q,
      api: API_KEY,
    },
    (json) => {
      const videos = (json.short_video_results || []).slice(0, parseInt(count));
      res.json({ videos });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
