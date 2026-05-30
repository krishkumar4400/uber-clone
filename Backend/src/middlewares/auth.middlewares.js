const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/User.models.js");
const blackListTokenModel = require("../models/blackListToken.models.js");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
      success: false,
    });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(_id);
    req.user = user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
