// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET, // ✅ Don't share this publicly
});

app.get('/', (req, res) => {
  res.send("running");
})

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "Error fetching response from OpenAI." });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
