import express from "express";
import {
  handlePost,
  getPosts,
  checkPrimary,
  editPost,
  addPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/handlepost", handlePost);
router.get("/getposts", getPosts);
router.get("/checkprimary", checkPrimary);
router.post("/editpost", editPost);
router.post("/addpost", addPost);

export default router;
