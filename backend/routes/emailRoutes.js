import express from "express";
import { sendEmails } from "../controllers/emailController.js";

const router = express.Router();

router.post("/sendEmails", sendEmails);

export default router;
