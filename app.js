const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/scrape", router);

app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
