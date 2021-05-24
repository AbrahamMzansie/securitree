const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const authMiddleware = require("../middleware/requireSignIn");
const producrtController = require("../controllers/productController");


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
  "/product/create",
  authMiddleware.requireSignIn,
  authMiddleware.adminMiddleware,
  upload.array("productPicture"),
  producrtController.createProduct
);



router.get("/products/:slug" , producrtController.getProductsBySlug)

router.get("/product/:productId",producrtController.getProductDetailsById);

module.exports = router;
