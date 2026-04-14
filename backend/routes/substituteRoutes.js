import express from "express";
import {
  getSubs,
  getSubInfo,
  editSubInfo,
  addSub,
  updateDates,
} from "../controllers/substituteController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getsubs", getSubs);
router.get("/getsubinfo", authenticateToken, getSubInfo);
router.post("/editsubinfo", authenticateToken, editSubInfo);
router.post("/addsub", addSub);
router.post("/updatedates", authenticateToken, updateDates);

export default router;
