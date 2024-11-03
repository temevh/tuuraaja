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

const database = client.db("tuuraaja");
const collection = database.collection("substitutes");

app.use(cors());
app.use(express.json());

app.get("/api/substitutes", async (req, res) => {
  try {
    const { subject, date } = req.query;
    console.log("subject: ", subject, "date:", date);
    let query = {};
    if (subject) {
      query = { subjects: subject };
    }

    const substitutes = await collection.find(query).toArray();
    //console.log(substitutes);

    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
});

app.post("/api/addsub", async (req, res) => {
  try {
    const newSub = req.body;
    console.log("new sub data", newSub);

    const result = await collection.insertOne(newSub);

    res.status(201).json({ message: "Substitute added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
});

app.listen(port, () => {
  console.log("server running on http://localhost:${port}");
});
