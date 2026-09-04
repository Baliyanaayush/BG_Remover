const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express");
const main = require("./config/db");
const userRouter = require("./routes/userroutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

await main(); // Connect to MongoDB

app.use(clerkMiddleware());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running ",
  });
});


module.exports = app;