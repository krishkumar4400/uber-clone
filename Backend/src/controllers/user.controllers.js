const userModel = require("../models/User.models.js");
const userService = require("../services/user.services.js");
const { validationResult } = require("express-validator");

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

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const isPasswordMatch = await user.comparePassword(password);
  console.log(isPasswordMatch);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const token = await user.generateAuthToken();

  return res.status(200).json({
    user,
    token,
  });
};
