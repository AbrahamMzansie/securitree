const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category = null;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId === undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        type : cate.type,
        parentId : cate.parentId,
        children: createCategories(categories, cate._id),
      });
    }
    return categoryList;
  };

const createInitialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
  .select("_id price quantity description slug productPictures name category")
  .populate({path : "category" , select : "_id name"}).exec();
  res.status(200).json({
    categories:createCategories(categories),
    products,
  });
};
module.exports = {
  createInitialData,
};
