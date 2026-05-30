const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * User schema for authentication and app user data.
 */
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters long"],
      trim: true,
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
    minlength: [5, "Email must be atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
});

/**
 * Generate a signed JWT auth token for the current user.
 * @returns {string}
 */
userSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

/**
 * Compare a plain text password with the stored hashed password.
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Hash a plain text password before saving it.
 * @param {string} password
 * @returns {Promise<string>}
 */
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

module.exports = userModel;
