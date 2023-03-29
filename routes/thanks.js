import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getThanks,
  postOneThanks,
} from "../controller/thanksController.js";

// Routes
router.route("/").get(auth, getThanks).post(auth, postOneThanks);

export default router;
