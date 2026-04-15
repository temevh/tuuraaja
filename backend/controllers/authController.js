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

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    await collection.updateOne(
      { email: user.email },
      { $set: { token: token } },
    );

    res
      .status(200)
      .json({
        message: "Login succesfull",
        user: { id: user._id, role: user.role },
      });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const getMe = (req, res) => {
  // req.user is populated by authenticateToken middleware
  res.status(200).json({ role: req.user.role, id: req.user.id });
};
