const userModel = require("../models/User.models.js");

/**
 * Create a new user document in the database.
 * @param {Object} params
 * @param {string} params.firstname
 * @param {string} [params.lastname]
 * @param {string} params.email
 * @param {string} params.password
 * @returns {Promise<import("../models/User.models.js")>}
 */
module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
