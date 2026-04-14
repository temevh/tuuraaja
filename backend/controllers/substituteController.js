import { database } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getSubs = async (req, res) => {
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

    const collection = database.collection("users");
    const substitutes = await collection.find(query).toArray();

    console.log("substitutes", substitutes);
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

export const getSubInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    //const { token } = req.query;
    const collection = database.collection("users");

    const result = await collection.findOne({ _id: new ObjectId(userId) });
    console.log("found info of substitute", result);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = {
      id: result._id,
      name: result.firstName,
      selectedTimes: result.selectedTimes,
      posts: result.posts || [],
      role: result.role,
    };

    res.status(200).json(data);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

export const editSubInfo = async (req, res) => {
  try {
    const collection = database.collection("users");

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
};

export const addSub = async (req, res) => {
  try {
    const newSub = req.body;
    const collection = database.collection("users");

    const result = await collection.insertOne(newSub);

    res.status(201).json({ message: "Substitute added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
};

export const updateDates = async (req, res) => {
  try {
    const userId = req.user.id;
    const { selectedTimes } = req.body;

    console.log("Updating dates for user ID:", userId);

    const collection = database.collection("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { selectedTimes: selectedTimes } },
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Käyttäjää ei löytynyt" });
    }

    res.status(200).json({ message: "Tiedot päivitetty onnistuneesti" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Palvelinvirhe tietoja päivitettäessä" });
  }
};
