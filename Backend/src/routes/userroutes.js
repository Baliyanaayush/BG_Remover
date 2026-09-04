const express = require("express");
const multer = require("multer");
const {clerkWebhooks,userCredit,removeBackground,createOrder, verifyPayment} = require("../controllers/userController");

const userRouter = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        )
      );
    }
  },
});

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits",userCredit)
userRouter.post( "/remove-bg", upload.single("image"), removeBackground );
userRouter.post("/create-order", createOrder); 
userRouter.post("/verify-payment", verifyPayment);

// userRouter.post("/credits", userCredits);

module.exports = userRouter;



