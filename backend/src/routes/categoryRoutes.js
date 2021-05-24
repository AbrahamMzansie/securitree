const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const authMiddleware = require("../middleware/requireSignIn");
const categoryController = require("../controllers/categoryController");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname) ,"uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  }
})
let upload = multer({storage });
router.post(
  "/category/create",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  upload.single("categoryPicture"),
  categoryController.createCategory
);
router.post(
  "/category/update",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  upload.array("categoryPicture"),
  categoryController.updateCategories
);
router.post(
  "/category/delete",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  categoryController.deleteCategories
);
router.get(
  "/category/getCategories",

  categoryController.getCategories
);

module.exports = router;
