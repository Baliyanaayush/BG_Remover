
const User = require("../models/user");
const { verifyWebhook } = require("@clerk/express/webhooks");

const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEIVED");

    const evt = await verifyWebhook(req);

    console.log("EVENT TYPE:", evt.type);

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          emailId: data.email_addresses?.[0]?.email_address || "",
          firstname: data.first_name || "",
          lastname: data.last_name || "",
          photo: data.image_url || "",
        };

        console.log("Creating user:", userData);

        await User.create(userData);

        console.log("✅ User created in MongoDB");

        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          emailId: data.email_addresses?.[0]?.email_address || "",
          firstname: data.first_name || "",
          lastname: data.last_name || "",
          photo: data.image_url || "",
        };

        await User.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true }
        );

        console.log("✅ User updated in MongoDB");

        return res.status(200).json({
          success: true,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await User.findOneAndDelete({
          clerkId: data.id,
        });

        console.log("✅ User deleted from MongoDB");

        return res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }

      default:
        console.log("ℹ️ Event ignored:", type);

        return res.status(200).json({
          success: true,
          message: "Event ignored",
        });
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  clerkWebhooks,
};

