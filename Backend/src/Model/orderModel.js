const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalItems: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [ "pending", "confirmed", "shipped",  "cancelled"],
       trim : true,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "successfull", "failed"],
       trim : true,
      default : "pending"
    },
    shippingAddress: {
      type: String,
      required: true,
      trim : true
    },

    orderedAt :{
      type : Date,
      default : Date.now,
    }
    
  },
  { timestamps: true }
);

module.exports = new mongoose.model("order", orderModel);
