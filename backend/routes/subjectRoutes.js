import express from "express";
import { getSubjects, addSubject } from "../controllers/subjectController.js";

const router = express.Router();

router.get("/getsubjects", getSubjects);
router.post("/addsubject", addSubject);

export default router;
