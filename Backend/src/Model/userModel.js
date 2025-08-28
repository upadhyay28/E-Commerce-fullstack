const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      trim: true,
    },

    userEmail: {
      type: String,
      require: true,
      trim: true,
    },
    userPassword: {
      type: String,
      require: true,
      trim: true,
    },
    userContact: {
      type: Number,
      require: true,
    },
    userAddress: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      require: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
