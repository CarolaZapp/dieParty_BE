import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getEvent,
  postOneEvent,
} from "../controller/eventController.js";

// Routes
router.route("/").get(auth, getEvent).post(auth, postOneEvent);


export default router;
