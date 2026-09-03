const express = require("express");
const {
  clerkWebhooks,
  userCredits,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);

userRouter.post("/credits", userCredits);

module.exports = userRouter;