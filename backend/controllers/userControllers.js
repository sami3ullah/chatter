const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const token = require("../config/generateToken");

// handling the registration of a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  // if fields are undefined
  if (!name || !email || !password) {
    res.status(400);
    throw new error("Please enter all Fields");
  }

  // check if user already exists
  const userExist = await userModel.findOne({ email });

  // if user exists
  if (userExist) {
    res.status(400);
    throw new error("User already exists");
  }

  // if user does not exist
  const user = await userModel.create({ name, email, password, image });
  // if user created successfully
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      //   also send JWT token
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new error("Failed to create the User");
  }
});

// handling the login of a user
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: token(user._id),
    });
  } else {
    res.status(401);
    throw new error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {});

module.exports = { registerUser, authenticateUser, allUsers };
