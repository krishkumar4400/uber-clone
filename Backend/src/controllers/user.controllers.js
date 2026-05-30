const userModel = require("../models/User.models.js");
const userService = require("../services/user.services.js");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.models.js");

/**
 * Register a new user account.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<import("express").Response>}
 */
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
      success: false,
    });
  }

  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname;

  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "Email already exists",
      success: false,
    });
  }

  const hashedPassword = await userModel.hashPassword(password);

  user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = await user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    token,
    user,
  });
};

/**
 * Authenticate a user and return a JWT token.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<import("express").Response>}
 */
module.exports.loginuser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
      success: false,
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const token = await user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    user,
    token,
  });
};

module.exports.getUserProfile = async (req, res) => {
  const user = req.user;
  console.log(user);
  return res.status(200).json({
    user,
  });
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListTokenModel.create({token});

  return res.status(200).json({
    message: "You are logged out",
    success: true,
  });
};
