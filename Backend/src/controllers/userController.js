const User = require("../models/user");
const { verifyWebhook } = require("@clerk/express/webhooks");
const { getAuth } = require("@clerk/express");
const main = require("../config/db")

const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEIVED");
    console.log("Authorization exists:", !!req.headers.authorization);

    const evt = await verifyWebhook(req);

    console.log("EVENT TYPE:", evt.type);

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          emailId: data.email_addresses?.[0]?.email_address || "",
          firstname: data.first_name || "User",
          lastname: data.last_name || "",
          photo: data.image_url || "",
        };

        console.log("Creating user:", userData);

        await User.create(userData);

        console.log("User stored in MongoDB");

        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          emailId: data.email_addresses?.[0]?.email_address || "",
          firstname: data.first_name || "User",
          lastname: data.last_name || "",
          photo: data.image_url || "",
        };

        await User.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await User.findOneAndDelete({
          clerkId: data.id,
        });

        return res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }

      default:
        console.log("Event ignored:", type);

        return res.status(200).json({
          success: true,
          message: "Event ignored",
        });
    }
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userCredit = async (req, res) => {
  try {
    // Make sure MongoDB is connected
 await main()
    const { userId, isAuthenticated } = getAuth(req);

    console.log("Authenticated:", isAuthenticated);
    console.log("Clerk User ID:", userId);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userData = await User.findOne({
      clerkId: userId,
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      creditBalance: userData.creditBalance,
    });
  } catch (error) {
    console.error("❌ CREDIT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  clerkWebhooks,
  userCredit,
};

