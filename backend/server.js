const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const JWT_SECRET = process.env.JWT_SECRET;

app.post("/api/register", async (req, res) => {
  const { email, password, ...otherDetails } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword, ...otherDetails };

  try {
    const collection = database.collection("substitutes");
    await collection.insertOne(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email, "password:", password);
  const collection = database.collection("substitutes");

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await collection.updateOne(
      { email: user.email },
      { $set: { token: token } }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

app.get("/api/getsubs", async (req, res) => {
  try {
    const { subject, date, level } = req.query;
    console.log("subject:", subject, "date:", date, "level:", level);

    // Parse the input date
    const inputDate = new Date(date);
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();
    const inputTime = inputDate.toISOString().split("T")[1];

    let query = {};

    if (subject) {
      query = {
        subjects: subject,
        dates: {
          $elemMatch: {
            $gte: new Date(
              `${inputYear}-${inputMonth + 1}-${inputDay}T${inputTime}`
            ),
            $lt: new Date(
              `${inputYear}-${inputMonth + 1}-${inputDay + 1}T00:00:00Z`
            ),
          },
        },
      };
      console.log("query", query);
    }

    const collection = database.collection("substitutes");

    const substitutes = await collection.find(query).toArray();
    console.log(substitutes);
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

app.post("/api/handlepost", async (req, res) => {
  try {
    const { user, postCode, primary } = req.body;
    console.log("User:", user);
    const collection = database.collection("posts");

    let updateQuery;

    if (primary === true) {
      updateQuery = { $set: { primarySub: user, isFilled: true } };
    } else {
      updateQuery = {
        $push: { secondarySubs: user },
        $set: { isFilled: true },
      };
    }

    const result = await collection.updateOne({ code: postCode }, updateQuery);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Ilmoittautuminen epäonnistui" });
    }

    res.status(200).json({ message: "Ilmoittautuminen vahvistettu" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/getposts", async (req, res) => {
  try {
    const { code } = req.query;

    const collection = database.collection("posts");
    let query = {};

    if (code) {
      query = { code: code };
      console.log(query);
    }

    const result = await collection.find(query).toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "An error occurred while retrieving posts" });
  }
});

app.get("/api/getsubinfo", async (req, res) => {
  try {
    const { token } = req.query;
    const collection = database.collection("substitutes");

    const result = await collection.findOne({ token: token });
    console.log("found info of substitute", result);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error retrieving data:", err);
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

app.post("/api/updatedates", async (req, res) => {
  try {
    const { email, dates } = req.body;
    console.log("update info for", email);
    console.log("new dates", dates);
    const collection = database.collection("substitutes");

    // Adjust dates to the desired timezone (e.g., GMT+2)
    const dateObjects = dates.map((date) => {
      const originalDate = new Date(date);
      const adjustedDate = new Date(
        originalDate.getTime() + 2 * 60 * 60 * 1000
      ); // Adjust by 2 hours
      return adjustedDate;
    });

    const result = await collection.updateOne(
      { email: email },
      { $set: { dates: dateObjects } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Virhe päivien päivittämisessä" });
    }
    res.status(200).json({ message: "Tiedot päivitetty onnistuneesti" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while updating info" });
  }
});

app.post("/api/addsubject", async (req, res) => {
  try {
    const subject = req.body;
    console.log("Attempting to add subject:", subject);
    const collection = database.collection("subjects");

    const existingSubject = await collection.findOne({ name: subject.name });
    if (existingSubject) {
      return res
        .status(201)
        .json({ message: "Subject already exists", exists: "true" });
    }
    const result = await collection.insertOne(subject);
    res.status(201).json({ message: "Subject added successfully", result });
  } catch (err) {
    console.error("Error adding subject:", err);
    res
      .status(500)
      .json({ error: "An error occurred while adding the subject" });
  }
});

app.post("/api/adddates", async (req, res) => {
  try {
    const { email, dates } = req.body;
    console.log("Attempting to update dates for", email);
    const collection = database.collection("substitutes");
    const result = await collection.updateOne(
      { email: email },
      { $addToSet: { dates: { $each: dates } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User was not found" });
    }

    res.status(200).json({ message: "Dates updates succesfully" });
  } catch (error) {
    console.error("Error updating dates;");
    res.status(500).json({ error: "An error occured while updating dates" });
  }
});

app.get("/getcredentials", async (req, res) => {
  try {
    const { email, password } = req.query;
    console.log("Checkind db for:", email, password);
    const collection = database.collection("substitutes");

    const exists = await collection.findOne({
      email: email,
      password: password,
    });
    if (exists) {
      return res
        .status(201)
        .json({ message: "User found from database", found: true });
    }
    const result = await collection.insertOne(subject);
    res.status(201).json({ message: "Credentials found", result });
  } catch (err) {
    console.error("Error getting credentials:", err);
    res.status(500).json({
      error: "An error occurred while getting the credentials",
      found: false,
    });
  }
});

app.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
