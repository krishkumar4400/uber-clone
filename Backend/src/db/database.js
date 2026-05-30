const mongoose = require("mongoose");

/**
 * Connect to MongoDB using the configured URI.
 * @returns {Promise<void>}
 */
function conenctToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connect to DB");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = conenctToDB;
