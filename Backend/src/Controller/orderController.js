const cartModel = require("../Model/cartModel");
const orderModel = require("../Model/orderModel");

const mongoose = require("mongoose");
const { isValid } = require("./Validation");

// place order

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId", "productName productPrice");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ msg: "Cart is empty" });
    }
    const { totalItems, totalPrice, items } = cart;
    const { shippingAddress } = res.body;

    if (!isValid(shippingAddress)) {
      return res.status(400).json({ msg: "Shipping Address is required" });
    }

    const orderData = {
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalItems,
      totalPrice,
      shippingAddress,
    };

    const newOrder = await orderModel.create(orderData);

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();
    return res.status(201).json({ msg: "Order placed Successfully", newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: " Internal Server Error", error });
  }
};

//get My Order

const getMyOrder = async (req, res) => {
  try {
    let userId = req.user.userId;

    const orders = await orderModel
      .find({ userId })
      .populate("items.productId", "productImage productName productPrice");

    if (orders.length === 0) {
      return res.status(404).json({ msg: "No order Found" });
    }

    return res.status(404).json({ msg: " your orders", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: " Internal Server Error", error });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
try {
    let orderId = req.params.id;

  let userId = req.user.userId;

  // orderId Validation
  if (!isValid(orderId)|| !mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ msg: "Valid orderId is Required" });
  }

  let order = await orderModel.findOne({ _id: orderId, userId });

  if (!order) {
    return res.status(404).json({ msg: "order not found" });
  }

  if (order.orderStatus !== "pending") {
    return res
      .status(404)
      .json({ msg: "only pending orders can be cancelled" });
  }

  order.orderStatus = "cancelled";
  await order.save();
  return res.status(200).json({msg : " Order cancelled Successfully" , order})
} catch (error) {
  console.log(error);
     return res.status(500).json({msg : "Internal Server Error" , error})
}

};

module.exports = { placeOrder, getMyOrder, cancelOrder };
