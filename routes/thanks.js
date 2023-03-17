import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getThanks,
  postOneThanks,
  updateOneThanks,
} from "../controller/thanksController.js";

// Routes
router.route("/").get(auth, getThanks).post(auth, postOneThanks);

router.route("/:id").patch(auth, updateOneThanks);

export default router;
