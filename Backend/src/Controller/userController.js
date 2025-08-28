const userModel = require("../Model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidContact,
} = require("./Validation");

//                                                        USER MODEL

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad request , No data provided" });
    }
    const {
      userName,
      userEmail,
      userPassword,
      userContact,
      userAddress,
      gender,
      age,
    } = userData;

    // name validation
    if (!isValid(userName)) {
      return res.status(400).json({ msg: "Username is required" });
    }

    if (!isValidName(userName)) {
      return res.status(400).json({ msg: "Invalid UserName" });
    }

    // email validation
    if (!isValid(userEmail)) {
      return res.status(400).json({ msg: "userEmail is required" });
    }
    if (!isValidEmail(userEmail)) {
      return res.status(400).json({ msg: "Invalid UserEmail" });
    }
    let duplicateEmail = await userModel.findOne({ userEmail });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // password validation
    if (!isValid(userPassword)) {
      return res.status(400).json({ msg: " Password is required" });
    }
    if (!isValidPassword(userPassword)) {
      return res.status(400).json({ msg: "Invalid User Password" });
    }
    let duplicatePassword = await userModel.findOne({ userPassword });
    if (duplicatePassword) {
      return res.status(400).json({ msg: "Password Already exists" });
    }

    // to hide password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(userPassword, salt);

    // for Contact Validation
    if (!isValid(userContact)) {
      return res.status(400).json({ msg: "UserContact is required" });
    }

    if (!isValidContact(userContact)) {
      return res.status(400).json({ msg: "Invalid UserContact" });
    }
    let duplicateContact = await userModel.findOne({ userContact });
    if (duplicateContact) {
      return res.status(400).json({ mg: "Contact Already Exists" });
    }

    //for Address Validation
    if (!isValid(userAddress)) {
      return res.status(400).json({ msg: "UserAddress is required" });
    }

    // for Gender Validation
    if (!isValid(gender)) {
      return res.status(400).json({ msg: "Gender is required" });
    }
    let validGender = ["male", "female", "others"];
    if (!validGender.includes(gender.trim().toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Gender must be 'male' , 'female' and 'others'" });
    }
    // for age Validation
    if (!isValid(age)) {
      return res.status(400).json({ msg: "Age is required" });
    }

    //   Create the data
    let user = await userModel.create({
      userName,
      userEmail,
      userContact,
      userPassword: hashpassword,
      userAddress,
      gender,
      age,
    });
    return res.status(201).json({ msg: "data added successfully", user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
// get(fetch) data
const getUserData = async (req, res) => {
  try {
    let UserData = await userModel.find();
    return res.status(200).json(UserData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Update UserData

const updateUserData = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    let loggedInUserId = req.user.userId;
    if (userId !== loggedInUserId) {
      return res
        .status(403)
        .json({ msg: "Bad Authorization !!! Invalid Token !!" });
    }

    // destructure

    let {
      userName,
      userEmail,
      userPassword,
      userContact,
      userAddress,
      gender,
      age,
    } = data;

    // Validation username
    if (userName !== undefined) {
      if (!isValid(userName)) {
        return res.status(400).json({ msg: "Username is required" });
      }

      if (!isValidName(userName)) {
        return res.status(400).json({ msg: "Invalid UserName" });
      }
    }

    //  Validation Email
    if (userEmail !== undefined) {
      if (!isValid(userEmail)) {
        return res.status(400).json({ msg: "UserEmail is required" });
      }

      if (!isValidEmail(userEmail)) {
        return res.status(400).json({ msg: "Invalid UserEmail" });
      }

      let duplicateEmail = await userModel.findOne({ userEmail });
      if (duplicateEmail) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }

    // Validation Password
    let salt;
    let hashpassword;
    if (userPassword !== undefined) {
      if (!isValid(userPassword)) {
        return res.status(400).json({ msg: "User Password is required" });
      }
      if (!isValidPassword(userPassword)) {
        return res.status(400).json({ msg: " Invalid User Password" });
      }
      salt = await bcrypt.genSalt(10);
      hashpassword = await bcrypt.hash(userPassword, salt);
      let duplicatePassword = await userModel.findOne({ userPassword });
      if (duplicatePassword) {
        return res.status(400).json({ msg: "Password Already Exist" });
      }
    }

    // Validation Contact
    if (userContact !== undefined) {
      if (!isValid(userContact)) {
        return res.status(400).json({ msg: "UserContact is required" });
      }

      if (!isValidContact(userContact)) {
        return res.status(400).json({ msg: "Invalid UserContact" });
      }
      let duplicateContact = await userModel.findOne({ userContact });
      if (duplicateContact) {
        return res.status(400).json({ mg: "Contact Already Exists" });
      }
    }
    // validation Address
    if (userAddress !== undefined) {
      if (!isValid(userAddress)) {
        return res.status(400).json({ msg: "UserAddress is required" });
      }
    }

    //  Validation for gender
    if (gender !== undefined) {
      if (!isValid(gender)) {
        return res.status(400).json({ msg: "Gender is required" });
      }
    }
    // Validation for age
    if (age !== undefined) {
      if (!isValid(age)) {
        return res.status(400).json({ msg: "Age is required" });
      }
    }

    //  Update data
    const update = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.status(200).json({ msg: "User Updated successfully", update });
  } catch (error) {
    console.log(error);

    return res.status(200).json({ msg: "Internal server error", error });
  }
};

//Delete User Data
const deleteUserData = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;
    const del = await userModel.findByIdAndDelete(userId, data, { new: true });

    return res.status(200).json({ msg: "User Updated successfully", update });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", error });
  }
};
//get user by query
const getUserByQuery = async (req, res) => {
  try {
    const userGender = req.query.validGender;
    if (!isValid(userGender)) {
      return res.status(400).json({ msg: "Gender is required" });
    }
    const users = await userModel.find({
      validGender: userGender.toLowerCase(),
    });
    if (users.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
// login user

const loginUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Bad Request , No Data Found" });
    }

    let { userEmail, userPassword } = req.body;

    if (!isValid(userEmail)) {
      return res.status(400).json({ msg: "Email is required" });
    }
    if (!isValid(userPassword)) {
      return res.status(400).json({ msg: "Password is required" });
    }

    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({ msg: " User Not Found With this Email" });
    }
    const matchUser = await bcrypt.compare(userPassword, user.userPassword);
    if (!matchUser) {
      return res.status(401).json({ msg: "Incorrect Password" }); //  401 - authentication error
    }

    const token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      "my-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({msg:"Login Successfully", token})
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  addUser,
  getUserData,
  updateUserData,
  deleteUserData,
  getUserByQuery,
  loginUser,
};
