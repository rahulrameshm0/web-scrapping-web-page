# Web Scrapping

A collection of web scraping projects using Node.js and the SerpAPI service. This repository demonstrates two approaches to scraping data from the web: direct API usage and building a backend service with a frontend UI.

---

## Projects

### 1. [Scrape Data Using API](./scrape-data-using-api/)

A lightweight Node.js project that uses the [SerpAPI](https://serpapi.com/) service to scrape various types of data from Google.

**Features:**
- **Google Search scraping** (`index.js`) — performs a Google search query with location parameters and returns JSON results
- **Google Lens scraping** (`scrapeGoogleLens.js`) — submits an image URL to Google Lens and retrieves visual matches
- **Google Short Videos scraping** (`scrapeShorts.js`) — fetches short-form video results (e.g., YouTube Shorts) for a given query

**Tech Stack:** Node.js, SerpAPI, dotenv

---

### 2. [Web Scrapping Using Backend](./web-scrapping-using-backend/)

A full-stack web application that lets users search for short videos and download them. Built with an Express.js backend and a vanilla HTML/CSS/JS frontend.

**Features:**
- Search for short videos using Google's short video engine via SerpAPI
- Display video results in a responsive card grid with thumbnails, titles, sources, and durations
- Download individual videos or all videos at once using `yt-dlp`
- Serves downloaded files through a local static file server

**Tech Stack:** Node.js, Express.js, SerpAPI, yt-dlp, vanilla HTML/CSS/JS

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) (required for video downloads in the backend project)
- A [SerpAPI](https://serpapi.com/) API key

---

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd "Web Scrapping"
```

### 2. Install dependencies

For each sub-project, install its dependencies:

```bash
# For scrape-data-using-api
cd scrape-data-using-api
npm install

# For web-scrapping-using-backend
cd web-scrapping-using-backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in each sub-project directory and add your SerpAPI key:

```
API_KEY=your_serpapi_key_here
```

---

## Usage

### Scrape Data Using API

Run any of the scripts directly:

```bash
# Google Search
node index.js

# Google Lens (image-based search)
node scrapeGoogleLens.js

# Google Short Videos
node scrapeShorts.js
```

### Web Scrapping Using Backend

Start the server:

```bash
cd web-scrapping-using-backend
node index.js
```

Then open your browser and navigate to:

```
http://localhost:3000
```

Enter a search query, select the number of results, and click **Search**. You can then download videos individually or all at once.

---

## API Endpoints (Backend Project)

| Method | Endpoint         | Description                                      |
|--------|------------------|--------------------------------------------------|
| GET    | `/api/search`    | Search short videos. Query params: `q`, `count`  |
| POST   | `/api/download`  | Download a video. Body: `{ url, title }`         |
| GET    | `/downloads/`    | Access downloaded video files                    |

---

## Project Structure

```
Web Scrapping/
├── scrape-data-using-api/
│   ├── index.js              # Google Search scraping
│   ├── scrapeGoogleLens.js   # Google Lens scraping
│   ├── scrapeShorts.js       # Google Short Videos scraping
│   ├── package.json
│   └── .env                  # (you create this)
│
├── web-scrapping-using-backend/
│   ├── index.js              # Express server & API routes
│   ├── public/
│   │   ├── index.html        # Frontend UI
│   │   ├── app.js            # Frontend logic
│   │   └── style.css         # Styles
│   ├── downloads/            # Downloaded videos (auto-created)
│   ├── package.json
│   └── .env                  # (you create this)
│
└── README.md
```

---

## License

ISC
