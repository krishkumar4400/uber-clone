const userModel = require("../models/User.models.js");
const userService = require("../services/user.services.js");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;
  const {firstname, lastname} = fullname;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = userModel.generateAuthToken();

  return res.status(201).json({
    token,
    user,
  });
};
