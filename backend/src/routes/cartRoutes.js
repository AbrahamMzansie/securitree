const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/requireSignIn");

router.post("/user/cart/addtocart" , authMiddleware.requireSignIn,
authMiddleware.userMiddleware,cartController.addItemToCart);

module.exports = router;