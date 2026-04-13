import { database } from "../config/db.js";

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

    const collection = database.collection("substitutes");
    const substitutes = await collection.find(query).toArray();

    console.log("substitutes", substitutes);
    res.status(200).json(substitutes);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};

export const getSubInfo = async (req, res) => {
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
};

export const editSubInfo = async (req, res) => {
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
};

export const addSub = async (req, res) => {
  try {
    const newSub = req.body;
    const collection = database.collection("substitutes");

    const result = await collection.insertOne(newSub);

    res.status(201).json({ message: "Substitute added successfully", result });
  } catch (err) {
    res.status(500).json({ error: "An error occured while retrieving data" });
  }
};

export const updateDates = async (req, res) => {
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
};
