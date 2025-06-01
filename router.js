const express = require("express");
const { scrapAndSummarize } = require("./api");
const router = express.Router();

router.get("/api/scrape", scrapAndSummarize);

module.exports = router;