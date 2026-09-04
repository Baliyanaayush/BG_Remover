const mongoose = require("mongoose");

let cachedConnection = null;
let cachedPromise = null;

const main = async () => {
  // Already connected
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  // Connection is already being established
  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(process.env.CONNECTING_STRING)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        cachedConnection = mongooseInstance.connection;
        return cachedConnection;
      })
      .catch((error) => {
        cachedPromise = null;
        cachedConnection = null;

        console.error(
          "❌ MongoDB connection failed:",
          error.message
        );

        throw error;
      });
  }

  return cachedPromise;
};

module.exports = main;

