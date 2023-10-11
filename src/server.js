const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// Endpoint to handle CSV file upload
app.post("/upload", upload.single("csv"), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      // Send back the parsed CSV data
      res.json({ data: results });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
