const Cart = require("../models/cartModel");
const addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, __cart) => {
    if (error) return res.status(400).json({ error });
    if (__cart) {
      const productData = __cart.cartItems.find(
        (item) => item.product == req.body.cartItems.product
      );

      if (productData) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": req.body.cartItems.product,
          },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: productData.quantity + req.body.cartItems.quantity,
              },
            },
          },
          {
            new: true,
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) return res.status(201).json({ _cart });
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) return res.status(201).json({ _cart });
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) return res.status(201).json({ cart });
      });
    }
  });
};

module.exports = {
  addItemToCart,
};
