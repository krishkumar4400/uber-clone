const mongoose = require("mongoose");

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