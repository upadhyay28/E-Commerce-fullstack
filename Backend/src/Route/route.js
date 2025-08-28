const express = require("express");
const Route = express.Router();

const {
  addUser,
  getUserData,
  updateUserData,
  deleteUserData,
  getUserByQuery,
  loginUser,
} = require("../Controller/userController");

const {
  addProduct,
  getProductData,
  getProductById,
  updateProductData,
  deleteProductData,
  getProductByQuery,
} = require("../Controller/productController");

const {
  addToCart,
  getCart,
  updateCart,
  removeItemFromCart,
  clearCart,
} = require("../Controller/cartController");

const {
  placeOrder,
  getMyOrder,
  cancelOrder,
} = require("../Controller/orderController");

const authMiddleware = require("../Middleware/Middleware");

//     user data
Route.post("/addUser", addUser);
Route.get("/UserData", authMiddleware, getUserData);
Route.put("/updateUser/:id", authMiddleware, updateUserData);
Route.delete("/deleteUser/:id", authMiddleware, deleteUserData);
Route.get("/getUserByQuery", getUserByQuery);
Route.post("/login", loginUser);

//  product Data
Route.post("/addProduct", authMiddleware, addProduct);
Route.get("/productData", getProductData);
Route.get("./getProductById/:id", getProductById);
Route.put("/updateProduct/:id", authMiddleware, updateProductData);
Route.delete("/deleteProduct/:id", authMiddleware, deleteProductData);
Route.get("/getProductByQuery", getProductByQuery);

//cart Data
Route.post("/addToCart", authMiddleware, addToCart);
Route.get("/getCart", authMiddleware, getCart);
Route.put("/updateCart", authMiddleware, updateCart);
Route.delete("/removeItem/:productId", authMiddleware, removeItemFromCart);
Route.delete("/clearCart", authMiddleware, clearCart);

// Order Data
Route.post("/placeOrder", authMiddleware, placeOrder);
Route.get("/getMyOrder", authMiddleware, getMyOrder);
Route.delete("/cancelOrder/:id", authMiddleware, cancelOrder);

module.exports = Route;
