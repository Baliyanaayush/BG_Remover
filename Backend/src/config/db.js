const mongoose = require("mongoose");

let isConnected = false;

const main = async () => {
  try {
    if (isConnected && mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.CONNECTING_STRING);

    isConnected = true;

    console.log("MongoDB connect");
  } catch (error) {
    isConnected = false;
    console.error(" MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = main;
