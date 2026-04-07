import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
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

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
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

app.post("/api/sendEmails", async (req, res) => {
  const { recipients, date, subject, postCode } = req.body;

  const templateParams = {
    email: "temehama@gmail.com",
    subject,
    date,
    postCode,
  };

  try {
    emailjs
      .send(process.env.SERVICEID, process.env.TEMPLATEID, templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
      });
  } catch (error) {
    console.error("Error sending emails:", error);
    console.error(error.response.body);
    res.status(500).json({
      message: "Failed to send emails",
      error: error.response?.body || error,
    });
  }
});

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
      return res.status(401).json({ error: "Väärä sähköposti tai salasana" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Väärä sähköposti tai salasana" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await collection.updateOne(
      { email: user.email },
      { $set: { token: token } },
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

app.get("/api/getsubs", async (req, res) => {
  try {
    const { subject, date, level } = req.query;
    if (!subject || !date) {
      return res.status(400).json({ error: "Subject and date are required" });
    }
    console.log("subject", subject, "date", date);
    const inputDate = new Date(date);
    const dateStringPrefix = inputDate.toISOString().split("T")[0];

    let query = {
      subjects: subject,
      selectedTimes: {
        $regex: `^${dateStringPrefix}`,
      },
    };

    const collection = database.collection("substitutes");
    const substitutes = await collection.find(query).toArray();

    console.log("substitutes", substitutes);
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
  console.log("Getting posts...");
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

    const data = {
      token: token,
      name: result.firstName,
      selectedTimes: result.selectedTimes,
    };

    res.status(200).json(data);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

app.post("/api/editsubinfo", async (req, res) => {
  try {
    const collection = database.collection("substitutes");

    const { post, subCode } = req.body;

    const result = await collection.updateOne(
      { token: subCode },
      { $push: { posts: post } },
    );

    console.log(result);

    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Virhe tietojen päivittämisessä" });
    }
    res.status(200).json({ message: "Tietoja muutettu onnistuneesti" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Virhe tietojen päivittämisessä" });
  }
});

app.get("/api/checkprimary", async (req, res) => {
  const { postCode, email } = req.query;
  const collection = database.collection("posts");

  const result = await collection.findOne({ code: postCode });

  if (result && result.primarySub.email === email) {
    return res.status(200).json({ isPrimary: true });
  }

  res.status(200).json({ isPrimary: false });
});

app.get("/api/getsubjects", async (req, res) => {
  try {
    const collection = database.collection("subjects");
    const courses = await collection.find({}).toArray();
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
    collection = database.collection("substitutes");

    const result = await collection.insertOne(newSub);

    res.status(201).json({ message: "Substitute added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
});

app.post("/api/editpost", async (req, res) => {
  try {
    const postsCollection = database.collection("posts");
    const subsCollection = database.collection("substitutes");
    const { action, email, code } = req.body;

    if (action === "cancelPrimary") {
      const post = await postsCollection.findOne({ code: code });

      if (post && post.primarySub && post.primarySub.email === email) {
        await postsCollection.updateOne(
          { code: code },
          { $set: { primarySub: "", isFilled: false } },
        );

        await subsCollection.updateOne(
          { email: email },
          { $pull: { posts: code } },
        );

        res.status(200).json({ message: "Ilmoitus peruttu onnistuneesti" });
      } else {
        res.status(404).json({ message: "Virhe ilmoittautumisen perumisessa" });
      }
    } else if (action === "cancelSecondary") {
      const post = await postsCollection.findOne({ code: code });

      if (
        post &&
        post.secondarySubs &&
        post.secondarySubs.some((sub) => sub.email === email)
      ) {
        await postsCollection.updateOne(
          { code: code },
          { $pull: { secondarySubs: { email: email } } },
        );

        await subsCollection.updateOne(
          { email: email },
          { $pull: { posts: code } },
        );

        res.status(200).json({ message: "Varasija peruttu onnistuneesti" });
      } else {
        res.status(404).json({ message: "Virhe varasijan perumisessa" });
      }
    } else {
      res.status(400).json({ message: "Virheellinen toiminto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/api/addpost", async (req, res) => {
  try {
    const { date, subject, postCode } = req.body;
    collection = database.collection("posts");

    const newPost = {
      date: date,
      subject,
      subject,
      isFilled: false,
      primarySub: "",
      secondarySubs: [],
      code: postCode,
    };

    const result = await collection.insertOne(newPost);
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Virhe ilmoituksen lisäämisessä" });
    }
    res.status(200).json({ message: "Ilmoitus luotu onnistuneesti" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Virhe ilmoituksen lisäämisessä" });
  }
});

app.post("/api/updatedates", async (req, res) => {
  try {
    const { token, selectedTimes } = req.body;
    console.log("token", token);
    console.log("selectedTimes", selectedTimes);
    const collection = database.collection("substitutes");

    const result = await collection.updateOne(
      { token: token },
      { $set: { selectedTimes: selectedTimes } },
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

app.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
