const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const slugify = require("slugify");
const shortid = require("shortid");

const createProduct = (req, res) => {
  const {
    name,
    price,
    description,
    offer,
    category,
    createdBy,
    quantity,
  } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price: price,
    description: description,
    productPictures: productPictures,
    category: category,
    createdBy: req.user._id,
    quantity: quantity,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(201).json({ product });
  });
};

const getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) return res.status(400).json({ error });
          if (products) {
            return res.status(200).json({
              products,
              productsByPrice: {
                under5: products.filter((product) => product.price <= 500),
                under1k: products.filter(
                  (product) => product.price > 500 && product.price <= 1000
                ),
                under2k: products.filter(
                  (product) => product.price > 1000 && product.price <= 2000
                ),
                greterThan2k: products.filter(
                  (product) => product.price > 2000
                ),
              },
            });
          } else {
            return res.status(400).json({ message: "No data found" });
          }
        });
      } else {
        return res.status(400).json({ message: "No data found" });
      }
    });
};

const getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      } else {
        return res.status(400).json({ message: "No data found" });
      }
    });
  } else {
    return res.status(400).json({ message: "Parameter not found" });
  }
};

module.exports = {
  createProduct,
  getProductsBySlug,
  getProductDetailsById ,
};
