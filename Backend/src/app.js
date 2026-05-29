const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use("/api/user", userRouter);

module.exports = app;
