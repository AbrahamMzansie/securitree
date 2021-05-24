const Page = require("../../models/pageModel");

const createPage = (req, res) => {
  const { bannerImages, productImages } = req.files;
  console.log(req.body);
  if (bannerImages.length > 0) {
    req.body.bannerImages = bannerImages.map((banner) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  if (productImages.length > 0) {
    req.body.productImages = productImages.map((product) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  req.body.createdBy = req.user._id;
  Page.findOne({ category: req.body.category }).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (data) {
      Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
        (error, updatedPage) => {
          if (error) {
            return res.status(400).json({ json });
          }
          if (updatedPage) {
            return res.status(200).json({ page: updatedPage });
          }
        }
      );
    } else {
      const page = new Page(req.body);
      page.save((error, page) => {
        if (error) {
          return res.status(400).json({ error });
        }
        if (page) {
          return res.status(200).json({ page });
        }
      });
    }
  });
};

const getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "Page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (page) {
        return res.status(200).json({ page });
      } else {
        return res.status(400).json({ message: "Internal error occured" });
      }
    });
  }
};
module.exports = {
  createPage,
  getPage,
};
