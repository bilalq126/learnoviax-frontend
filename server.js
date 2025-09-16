const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve static files from Vite build (for production)
app.use(express.static(path.join(__dirname, "dist")));

// Signup endpoint
app.post("/signup", (req, res) => {
  const { name, email, password, course, level } = req.body;
  const row = `${name},${email},${password},${course},${level}\n`;
  fs.appendFile("users.csv", row, { encoding: "utf8" }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving data");
    }
    res.send("User saved to CSV ✅");
  });
});

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
