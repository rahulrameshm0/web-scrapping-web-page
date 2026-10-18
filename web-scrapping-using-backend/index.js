require("dotenv").config();
const API_KEY = process.env.API_KEY;
console.log("API_KEY loaded:", API_KEY ? "Yes" : "No");

const express = require("express");
const path = require("path");
const fs = require("fs");
const { getJson } = require("serpapi");

const app = express();
const port = 3000;
const DOWNLOADS_DIR = path.join(__dirname, "downloads");

if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloads", express.static(DOWNLOADS_DIR));

app.get("/api/search", (req, res) => {
  const { q, count = 5 } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  getJson(
    {
      engine: "google_short_videos",
      q,
      api_key: API_KEY,
    },
    (json) => {
      const videos = (json.short_video_results || []).slice(0, parseInt(count));
      res.json({ videos });
    },
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
