    // server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

const serpApiKey = "7744de1df17874258ce4e39c8bb8e64621ba438923df12367cb755c8ad552c1a"; // Replace with your SerpAPI key

// Allow requests from the frontend (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to search for items in stores
app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_shopping",
        q: query,
        api_key: serpApiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: "Error fetching data from SerpAPI", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
