const express = require("express");
const router = express.Router();
const authController = require("../../controllers/adminControllers/authController");

const {
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post(
  "/admin/signin",
  validateSigninRequest,
  isRequestValidated,
  authController.signin
);
router.post(
  "/admin/signup",
  authController.signup
);
router.post(
  "/admin/signout",
  authController.signout
);

module.exports = router;
