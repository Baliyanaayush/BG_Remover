
const jwt = require("jsonwebtoken");

const UserMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorised, login again",
      });
    }

    const tokenDecoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!tokenDecoded?.clerkId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.body.clerkId = tokenDecoded.clerkId;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = UserMiddleware;

