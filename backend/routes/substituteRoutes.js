import express from "express";
import {
  getSubs,
  getSubInfo,
  editSubInfo,
  addSub,
  updateDates,
} from "../controllers/substituteController.js";

const router = express.Router();

router.get("/getsubs", getSubs);
router.get("/getsubinfo", getSubInfo);
router.post("/editsubinfo", editSubInfo);
router.post("/addsub", addSub);
router.post("/updatedates", updateDates);

export default router;
