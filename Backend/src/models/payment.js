
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

   razorpayPaymentId: {
  type: String,
  unique: true,
  sparse: true,
},

    amount: {
      type: Number,
      required: true,
    },

    credits: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["created", "paid"],
      default: "created",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
