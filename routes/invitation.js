import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getInvitation,
  postOneInvitation,
} from "../controller/invitationController.js";

// Routes
// router.route("/").get(auth, getInvitation).post(auth, postOneInvitation);
router.route("/").post(auth, postOneInvitation);
router.route("/:eventId").get(getInvitation);





export default router;
