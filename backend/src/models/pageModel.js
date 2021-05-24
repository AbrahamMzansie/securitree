const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    bannerImages: [
      {
        img: {
          type: String,
        },
        navigateTo: { type: String },
      },
    ],
    productImages: [
      {
        img: {
          type: String,
          navigateTo: { type: String },
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique : true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const page = mongoose.model("Page", pageSchema);
module.exports = page;

