import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  // getInvitation,
  getUserInvitation, // Idee 
  postOneInvitation,
} from "../controller/invitationController.js";

// Routes
// router.route("/").get(auth, getInvitation).post(auth, postOneInvitation);
// router.route("/").get(getInvitation)
router.route("/:eventId").get(getUserInvitation);
router.route("/").post(auth, postOneInvitation);




export default router;
