require("dotenv").config();
const API_KEY = process.env.API_KEY;
console.log("API_KEY loaded:", API_KEY ? "Yes" : "No");

const express = require("express");
const path = require("path");
const fs = require("fs");
const { getJson } = require("serpapi");
const { json } = require("stream/consumers");
const { exec, execFile } = require("child_process");
const { time } = require("console");
const { stderr } = require("process");

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

app.post("/api/download", (req, res) => {
  const { url, title } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const safeName = (title || "video")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 60);
  const outPutTemplate = path.join(DOWNLOADS_DIR, `${safeName}.mp4`);
  execFile(
    "yt-dlp",
    [
      "-o",
      outPutTemplate,
      "--no-playlist",
      "--no-check-certificate",
      "--merge-output-format", "mp4",
      url,
    ],
    { timeout: 120000 },
    (error, stdout, stderr) => {
      if (error) {
        console.error("yt-dlp error:", stderr);
        return res
          .status(500)
          .json({ error: "Failed to download video", details: stderr });
      }

      const files = fs.readdirSync(DOWNLOADS_DIR);
      const downloaded = files.find((f) => f.startsWith(safeName));

      if (downloaded) {
        res.json({
          success: true,
          fileName: downloaded,
          path: `downloads/${downloaded}`,
        });
      } else {
        res.json({
          success: false,
          message: "download completed but file not downloaded",
        });
      }
    },
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
