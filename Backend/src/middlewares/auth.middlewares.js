const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in",
      success: false,
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = _id;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal server error",
        success: false
    });
  }
};
