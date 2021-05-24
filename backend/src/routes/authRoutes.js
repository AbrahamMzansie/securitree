const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/requireSignIn");
const {
  validateSignUpRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  authController.signin
);
router.post(
  "/signup",
  validateSignUpRequest,
  isRequestValidated,
  authController.signup
);
router.get("/profile", authMiddleware.requireSignIn, authController.profile);

module.exports = router;
