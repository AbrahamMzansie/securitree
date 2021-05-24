const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/requireSignIn");
const { upload } = require("../../middleware/imageUpload");
const pageController = require("../../controllers/adminControllers/pageController");

router.post(
  "/admin/page/create",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  upload.fields([{ name: "productImages" }, { name: "bannerImages" }]),
  pageController.createPage
);
router.get(
  "/admin/page/:category/:type",

  pageController.getPage
);

module.exports = router;
