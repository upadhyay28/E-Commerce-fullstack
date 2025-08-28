const { isValid, isValidURL } = require("./Validation");
const productModel = require("../Model/productModel");
const mongoose = require("mongoose");

//                            PRODUCT MODEL
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ msg: "Bad Request , No data Provided" });
    }

    // destructure of Validation
    const {
      productName,
      productImage,
      productCategory,
      productPrice,
      productRatings,
      productDiscription,
      isfreeDelivery,
    } = productData;

    // for productName Validation
    if (!isValid(productName)) {
      return res.status(400).json({ msg: "ProductName is required" });
    }

    const duplicateProduct = await productModel.findOne({ productName });
    if (duplicateProduct) {
      return res.status(400).json({ msg: "Product Name is already Exists" });
    }

    // for ProductImage Validation
    if (!isValid(productImage)) {
      return res.status(400).json({ msg: "ProductImage is required" });
    }
    if (!isValidURL(productImage)) {
      return (
        res,
        json.status(400).json({ msg: "Invalid Url !! Valid Url is required" })
      );
    }

    // ProductCategory
    if (!isValid(productCategory)) {
      return res.status(400).json({ msg: "Product Category is required" });
    }

    let validCategory = ["beauty", "fashion", "electronics", "home ", " books"];

    if (!validCategory.includes(productCategory.trim().toLowerCase())) {
      return res.status(400).json({ msg: "Valid Category is Required" });
    }
    // for ProductPrice Validation

    if (!isValid(productPrice) || productPrice < 0) {
      return res.status(400).json({ msg: "Product price is Required" });
    }
    //  for product ratings
    if (!isValid(productRatings)) {
      return res.status(400).json({ msg: " product ratings is required" });
    }
    // for Product Discription Validation

    if (!isValid(productDiscription)) {
      return res.status(400).json({ msg: "Product Discription is Required" });
    }
    // is Free Delivery

    if (productData.hasOwnProperty(isfreeDelivery)) {
      if (typeof isfreeDelivery !== "boolean") {
        return res
          .status(400)
          .json({ msg: "isFreeDelivery must be a boolean value" });
      }
    }

    //   Create the data of product
    let product = await productModel.create(productData);
    return res
      .status(201)
      .json({ msg: " product data added successfully", product });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get(fetch)all product data
const getProductData = async (req, res) => {
  try {
    let ProductData = await productModel.find();
    if (product.length === 0) {
      return res.status(404).json({ msg: "No product found" });
    }
    return res
      .status(200)
      .json({ msg: "Products List", count: product.length, ProductData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// product by Id

const getProductById = async (req, res) => {
  try {
    let ProductId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
      return res.status(400).json({ msg: "Invalid Product Id" });
    }

    const Product = await productModel.findOne({ ProductId });

    if (!Product) {
      return res.status(400).json({ msg: "Product not found" });
    }
    return res.status(400).json({ msg: "Product Found", Product });
  } catch (error) {}
};
//    Update Product Data
const updateProductData = async (req, res) => {
  try {
    let productId = req.params.id;
    let productdata = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid Product Id" });
    }
    if (object.keys(productdata).length === 0) {
      return res.status(400).json({ msg: "No data provided" });
    }
    // destructure
    const {
      productName,
      productImage,
      productCategory,
      productPrice,
      productRatings,
      productDiscription,
      isfreeDelivery,
    } = productdata;

    const updateData = {};

    // validation product Name
    if (productName !== undefined) {
      if (!isValid(productName)) {
        return res.status(400).json({ msg: "Product name is required" });
      }
    }
    // Validation product image
    if (productImage !== undefined) {
      if (!isValid(productImage) || !isValidURL(productImage)) {
        return res.status(400).json({ msg: "Product Image is required" });
      }
      updateData.productImage = productImage;
    }

    // Category
    if (productCategory !== undefined) {
      if (!isValid(productCategory)) {
        return res.status(400).json({ msg: "Product Category is required" });
      }

      const validCategory = [
        "beauty",
        "fashion",
        "electronics",
        "home ",
        " books",
      ];
      // category validation
      if (!validCategory.includes(category.trim().toLowerCase())) {
        return res.status(400).json({ msg: "Valid Category is Required" });
      }
      updateData.productCategory = validCategory;
    }
    // Validation product Price
    if (productPrice !== undefined) {
      if (!isValid(productPrice) || productPrice < 0) {
        return res.status(400).json({ msg: "Product price is required" });
      }
      updateData.productPrice = productPrice;
    }

    // validation product ratings
    if (productRatings !== undefined) {
      if (!isValid(productRatings) || ratings < 0 || ratings > 5) {
        return res.status(400).json({ msg: "product ratings is required" });
      }
      updateData.productRatings = productRatings;
    }
    // Validation product discription
    if (productDiscription !== undefined) {
      if (!isValid(productDiscription)) {
        return res.status(400).json({ msg: "Product Discription is Required" });
      }
      updateData.productDiscription = productDiscription;
    }

    // is free delivery

    if (typeof isfreeDelivery !== "undefined") {
      if (typeof isfreeDelivery !== "boolean") {
        return res
          .status(400)
          .json({ msg: " isfreeDelivery mustr be boolean(true or false)" });
      }
      updateData.isfreeDelivery = isfreeDelivery;
    }

    //  Update data
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ msg: "Product Data Updated successfully", updateProduct });
  } catch (error) {
    console.log(error);

    return res.status(200).json({ msg: "Internal server error", error });
  }
};

//Delete User Data
const deleteProductData = async (req, res) => {
  try {
    let productId = req.params.id;
    let productdata = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid product Id" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({ msg: " Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

//get productby query
const getProductByQuery = async (req, res) => {
  try {
    const Data = req.body;
    if (Object.keys(Data).length === 0) {
      return res.status(400).json({
        msg: "Bad Request!! please provide atleast one query parameter",
      });
    }
    let {
      productName,
      productCategory,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      isfreeDelivery,
    } = Data;

    let filter = {};

    if (productName) {
      filter.productName = { $regex: productName, $options: "i" };
    }
    if (productCategory) {
      filter.productCategory = productCategory.toLowerCase();
    }
    if (typeof minPrice !== "undefined" || typeof maxPrice !== "undefined") {
      filter.price = {};
      if (typeof minPrice !== "undefined") filter.price.$gte = Number(minPrice);
      if (typeof maxPrice !== "undefined") filter.price.$lte = Number(maxPrice);
    }

    if (typeof minRating !== "undefined" || typeof maxRating !== "undefined") {
      filter.ratings = {};
      if (typeof minRating !== "undefined")
        filter.ratings.$gte = Number(minRating);
      if (typeof maxRating !== "undefined")
        filter.ratings.$lte = Number(maxRating);
    }
    if (typeof isfreeDelivery !== "undefined") {
      if (isfreeDelivery === "true") filter.isfreeDelivery = true;
      else if (isfreeDelivery === "false") filter.isfreeDelivery = false;
      else {
        return res.status(400).json({
          msg: "Invalid value for isFreeDelivery. Use 'true' or 'false'.",
        });
      }
    }
    const products = await productModel.find(filter);
    if (products.length === 0) {
      return res.status(404).json({ msg: "No Products Match Your Query" });
    }

    return res.status(200).json({
      msg: "Filtered Products",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  addProduct,
  getProductData,
  getProductById,
  updateProductData,
  deleteProductData,
  getProductByQuery,
};
