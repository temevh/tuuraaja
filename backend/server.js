import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import substituteRoutes from "./routes/substituteRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import cookieParser from "cookie-parser";

import "./config/db.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", emailRoutes);
app.use("/api", authRoutes);
app.use("/api", substituteRoutes);
app.use("/api", postRoutes);
app.use("/api", subjectRoutes);

app.listen(port, () => {
  console.log("server running on http://localhost:" + port);
});
