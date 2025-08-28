const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    productImage: {
      type: String,
      require: true,
    },
    productCategory: {
      type: String,
      enum: ["beauty", "fashion", "electronics", "home", "books"],
      require: true,
      trim: true,
      lowercase: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productRatings: {
      type: Number,
      require: true,
      min: 0,
      max: 5,
      default: 0,
    },

    productDiscription: {
      type: String,
      require: true,
      trim: true,
    },
    isfreeDelivery: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productSchema);
