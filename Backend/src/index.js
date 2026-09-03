const express = require("express");
const cors = require("cors");
require("dotenv").config();

const main = require("./config/db");
const userRouter = require("./routes/userroutes");
const { clerkWebhooks } = require("./controllers/userController");

const app = express();

app.use(cors());

+
// CLERK WEBHOOK
// IMPORTANT: RAW BODY MUST COME FIRST


app.post(
  "/user/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
// NORMAL JSON PARSER

app.use(express.json());

// ==========================================
// DEMO ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

// ==========================================
// USER ROUTES
// ==========================================

app.use("/user", userRouter);

// ==========================================
// MONGODB CONNECTION
// ==========================================

main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// ==========================================
// EXPORT FOR VERCEL
// ==========================================

module.exports = app;

