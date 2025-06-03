const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { getPrompt, queryGemini, extractJSON } = require("../helper");

const scrapeWithCheerio = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const rawText = $("body").text().replace(/\s+/g, " ").trim();
    return rawText;
};
  
const scrapeWithPuppeteer = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    const content = await page.evaluate(() => document.body.innerText);
    await browser.close();
    return content.trim();
};
  
async function scrapAndSummarize(req, res){
    const url = req.query.url;
    const mode = req.query.mode || "static";

    try {
        let pageText = "";

        if (mode === "dynamic") {
        pageText = await scrapeWithPuppeteer(url);
        } else {
        pageText = await scrapeWithCheerio(url);
        }

        const limitedText = getPrompt(pageText.slice(0, 10000));
        const completion = await queryGemini(limitedText);
        const structured = extractJSON(completion);

        res.send({ structured });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to summarize the page" });
    }
};

module.exports = {
    scrapAndSummarize,
};