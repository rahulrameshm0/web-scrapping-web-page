require("dotenv").config();
const {getJson} = require("serpapi")
const API_KEY = process.env.API_KEY;

getJson({
    engine: "google_lens",
    url: "https://i.imgur.com/HBrB8p0.jpeg",
    api_key: API_KEY
}, (json) => {
    console.log(json["visual_matches"])
})
