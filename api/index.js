const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { getPrompt, queryOllama } = require("../helper");

const scrapeWithCheerio = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const rawText = $("body").text().replace(/\s+/g, " ").trim();
    return rawText;
};
  
  // 🔹 Function to scrape using Puppeteer (Dynamic Pages)
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
        console.log("Using Puppeteer to scrape dynamic content...");
        pageText = await scrapeWithPuppeteer(url);
        } else {
        console.log("Using Cheerio to scrape static content...");
        pageText = await scrapeWithCheerio(url);
        }

        const limitedText = getPrompt(pageText.slice(0, 4000));
        const completion = await queryOllama(limitedText);
        console.log("LLM response:", completion);

        const summary = completion.choices[0].message.content;

        res.json({ summary });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to summarize the page" });
    }
};

module.exports = {
    scrapAndSummarize,
};