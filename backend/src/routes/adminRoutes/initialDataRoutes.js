const express = require("express");
const router = express.Router();
const initialCotroller = require("../../controllers/adminControllers/initialDataController");
const authMiddleware = require("../../middleware/requireSignIn");

router.post(
  "/initialData",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  initialCotroller.createInitialData
);
module.exports = router;
