const express = require("express");
const {clerkWebhooks,userCredit} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits",userCredit)

// userRouter.post("/credits", userCredits);

module.exports = userRouter;