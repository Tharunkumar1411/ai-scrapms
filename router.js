const express = require("express");
const router = express.Router();

const scrapAndSummarize = require("./api/index.js").scrapAndSummarize;

router.get("/api/scrape", scrapAndSummarize);

module.exports = router;