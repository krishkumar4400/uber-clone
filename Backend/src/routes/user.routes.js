const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controllers.js");

const userRouter = express.Router();

/**
 * Route: POST /api/user/register
 * Description: Register a new user with fullname, email, and password.
 */
userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userController.registerUser,
);

/**
 * Route: POST /api/user/login
 * Description: Authenticate a user and return a JWT token.
 */
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 character long"),
  ],
  userController.loginuser,
);

module.exports = userRouter;
