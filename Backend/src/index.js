
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const main = require("./config/db");
const userRouter = require("./routes/userroutes");
const { clerkWebhooks } = require("./controllers/userController");

const app = express();
const PORT = process.env.LISTENING_PORT || 3000;

app.use(cors());

// IMPORTANT: webhook must receive raw body
app.post(
  "/user/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// JSON parser AFTER webhook route
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BG Remover API is running 🚀",
  });
});

app.use("/user", userRouter);

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

module.exports = app;

