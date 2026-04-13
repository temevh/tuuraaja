import { database } from "../config/db.js";

export const getSubjects = async (req, res) => {
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
};

export const addSubject = async (req, res) => {
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
};
