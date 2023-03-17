import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";

// import controller functions
import {
  getAllUserGuests,
  postOneUserGuest,
  updateOneUserGuest,
} from "../controller/userGuestController.js";

// Routes
router
  .route("/")
  .get(auth, getAllUserGuests)
  .post(auth, postOneUserGuest)
  .patch(updateOneUserGuest);

export default router;
