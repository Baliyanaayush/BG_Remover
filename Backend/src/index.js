const express = require("express");
const cors = require("cors");
require("dotenv").config();

const main = require("./config/db");
const userRouter = require("./routes/userroutes");
const { clerkWebhooks } = require("./controllers/userController");

const app = express();

const PORT = process.env.LISTENING_PORT || 3000;

// ---------------- CORS ----------------
app.use(cors());

// ---------------- Clerk Webhook ----------------
// IMPORTANT: raw body is required for Svix signature verification
app.post(
  "/user/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// ---------------- JSON Middleware ----------------
app.use(express.json());

// ---------------- Demo Route ----------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

// ---------------- Other User Routes ----------------
app.use("/user", userRouter);

// ---------------- MongoDB + Server ----------------
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

