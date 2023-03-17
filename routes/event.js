import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getEvent,
  postOneEvent,
  updateOneEvent,
} from "../controller/eventController.js";

// Routes
router.route("/").get(auth, getEvent).post(auth, postOneEvent);

router.route("/:id").patch(auth, updateOneEvent);

export default router;
