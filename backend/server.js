const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tuuraaja", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/substitute", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
