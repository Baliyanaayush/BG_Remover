const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express");
const userRouter = require("./routes/userroutes");
const dbMiddleware = require("./controllers/dbmiddleware")

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(dbMiddleware)

app.use(clerkMiddleware());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running ",
  });
});


module.exports = app;