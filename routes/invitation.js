import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

// import controller functions
import {
  getInvitation,
  postOneInvitation,
  updateOneInvitation,
} from "../controller/invitationController.js";

// Routes
router.route("/").get(auth, getInvitation).post(auth, postOneInvitation);
// router.route("/").get(getInvitation).post(auth, postOneInvitation);

router.route("/:id").patch(auth, updateOneInvitation);

export default router;
