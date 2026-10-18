require("dotenv").config();
const {getJson} = require("serpapi")
const API_KEY = process.env.API_KEY;

getJson({
    engine: "google_short_videos",
    q: "iphone",
    api_key: API_KEY
}, (json) => {
    console.log(json)
})
