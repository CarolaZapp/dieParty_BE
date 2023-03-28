import express from "express";
const router = express.Router();

import {
  userValidator,
} from "../middleware/userValidator.js";
import { validateRequest } from "../middleware/validator.js";
import auth from "../middleware/auth.js";

// import controller functions
import {
  getAllUsers,
  getOneUser,
  postOneUser,
  updateOneUser,
  postLogin,
  getVerifyEmail,
} from "../controller/userController.js";

// Routes
router
  .route("/")
  .get(getAllUsers)
  .post(userValidator, validateRequest, postOneUser);

router.route("/login").post(postLogin);
router.route("/verify/:token").get(getVerifyEmail);

router
  .route("/:id")
  .get(getOneUser)
  .patch(validateRequest, auth, updateOneUser);

export default router;
