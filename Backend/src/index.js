const express = require("express");
require("dotenv").config();
const cors = require("cors");
const main = require("./config/db");
const PORT = process.env.LISTENING_PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

// Your routes
// app.use("/api", yourRouter);

// IMPORTANT FOR VERCEL
module.exports = app;

