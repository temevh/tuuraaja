const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Sijainen = require("./schemas/sijainenModel");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tuuraaja");

const sub = mongoose.model("sijaiset", Sijainen);

app.get("/api/substitute", (req, res) => {
  res.json(sub.find());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
