require("dotenv").config();
const {getJson} = require("serpapi")
const API_KEY = process.env.API_KEY;

getJson({
    engine: "google",
    q: "cafe",
    location: "kerala, India",
    zen_domain: "google.co.uk",
    hl: "en",
    gl:"UK",
    api_key: API_KEY
}, (json) => {
    console.log(json)
})
