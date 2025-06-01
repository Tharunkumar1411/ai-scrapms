const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { warmUpModel, queryOllama } = require("./helper");
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
  await warmUpModel('llama3.2');
  
  // Now safe to use
  const answer = await queryOllama("What is the capital of Japan?", 'llama3.2');
  console.log("🧠 Answer:", answer);
});
