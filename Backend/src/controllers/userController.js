const User = require("../models/user");
const { Webhook } = require("svix");

// API controller to manage Clerk with Database
const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔥 WEBHOOK RECEIVED");

    // Create Svix webhook instance
    const whook = new Webhook(
      process.env.CLERK_WEBHOOK_SECRET
    );

    // Get Svix headers
    const svixHeaders = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // IMPORTANT:
    // req.body is a Buffer because we used express.raw()
    const payload = req.body.toString();

    // Verify webhook signature
const evt = await whook.verify(payload, svixHeaders);
    const { data, type } = evt;

    console.log("TYPE:", type);
    console.log("CLERK ID:", data.id);

    switch (type) {
      // ---------------- USER CREATED ----------------
      case "user.created": {
        const userData = {
          clerkId: data.id,
          emailId:
            data.email_addresses?.[0]?.email_address || "",
          firstname: data.first_name || "",
          lastname: data.last_name || "",
          photo: data.image_url || "",
        };

        await User.create(userData);

        console.log("✅ User created in MongoDB");

        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }

      // ---------------- USER UPDATED ----------------
      case "user.updated": {
        const userData = {
          emailId:
            data.email_addresses?.[0]?.email_address || "",
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

      // ---------------- USER DELETED ----------------
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

      // ---------------- OTHER EVENTS ----------------
      default: {
        console.log("ℹ️ Event ignored:", type);

        return res.status(200).json({
          success: true,
          message: "Webhook event ignored",
        });
      }
    }
  } catch (error) {
    console.log("❌ Webhook Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  clerkWebhooks,
};

