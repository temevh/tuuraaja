import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { database } from "../config/db.js";

export const register = async (req, res) => {
  const { email, password, ...otherDetails } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword, ...otherDetails };

  try {
    const collection = database.collection("users");
    await collection.insertOne(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email, "password:", password);
  const collection = database.collection("users");

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Väärä sähköposti tai salasana" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Väärä sähköposti tai salasana" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
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
};
