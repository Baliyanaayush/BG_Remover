const main = require("../config/db");

const dbMiddleware = async (req, res, next) => {
  try {
    await main();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

module.exports = dbMiddleware;