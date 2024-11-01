const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");

const port = 5000;

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("connected to db");
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

app.use(cors());

app.get("/api/substitutes", async (req, res) => {
  try {
    const database = client.db("tuuraaja");
    const collection = database.collection("sijaiset");

    const { getSubject } = req.query;
    let query = {};
    if (getSubject) {
      query = { aineet: getSubject };
    }

    const substitutes = await collection.find(query).toArray();

    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
});

app.listen(port, () => {
  console.log("server running on http://localhost:${port}");
});
