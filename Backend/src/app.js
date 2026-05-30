const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Health check endpoint.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
app.get("/", (req, res) => {
  res.send("Hello Express");
});

/**
 * Mount the user-related routes under /api/user.
 */
app.use("/api/user", userRouter);

module.exports = app;
