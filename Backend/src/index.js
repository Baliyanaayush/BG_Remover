const express = require("express");
const cors = require("cors");
require("dotenv").config();

const main = require("./config/db");
const userRouter = require("./routes/userroutes");

const app = express();
const PORT = process.env.LISTENING_PORT || 3000;

app.use(cors());

// Normal JSON routes
app.use(express.json());

// Normal routes
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

main()
  .then(() => {
    console.log("MongoDB connected");

    // For local development
    app.listen(PORT, () => {
      console.log(`BG Remover API listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  });

module.exports = app;