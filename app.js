const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { warmUpModel, queryGemini } = require("./helper");
const router = require("./router");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/scrape", router);

app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
