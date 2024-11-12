const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = 5000;

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    console.log("connected to db");
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

const database = client.db("tuuraaja");
let collection;

app.use(cors());
app.use(express.json());

app.get("/api/getsub", async (req, res) => {
  try {
    const { subject, date } = req.query;
    console.log("subject:", subject, "date:", date);

    let query = {};

    if (subject) {
      query = { subjects: subject, dates: date };
      console.log(query);
    }
    collection = database.collection("substitutes");

    const substitutes = await collection.find(query).toArray();
    console.log(substitutes);
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

app.get("/api/getsubjects", async (req, res) => {
  console.log("getcourses get request");
  try {
    const collection = database.collection("subjects");
    const courses = await collection.find({}).toArray();
    console.log("Courses:", JSON.stringify(courses, null, 2));
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error retrieving courses:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving subjects" });
  }
});

app.post("/api/addsub", async (req, res) => {
  try {
    const newSub = req.body;
    console.log("addsub new info", newSub);
    console.log("new sub data", newSub);
    collection = database.collection("substitutes");

    const result = await collection.insertOne(newSub);

    res.status(201).json({ message: "Substitute added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
});

app.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
