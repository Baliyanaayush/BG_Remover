const express = require("express");
const cors = require("cors");
require("dotenv").config();
const main = require("./config/db");
const userRouter = require("./routes/userroutes");

const app = express();

const PORT = process.env.LISTENING_PORT || 3000;
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// ---------------- Demo Route ----------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

// Routes 

app.use("/user", userRouter);

// MongoDB + Server

main()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`BG Remover API listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  });

// IMPORTANT FOR VERCEL
module.exports = app;

