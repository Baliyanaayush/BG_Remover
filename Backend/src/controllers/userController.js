const { Webhook } = require("svix");
const User = require("../models/user");

// API controller to manage Clerk with Database
const clerkWebhooks = async (req, res) => {
  try {
    // Create Svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          emailId: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        await User.create(userData);

        return res.json({
          success: true,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          emailId: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        await User.findOneAndUpdate(
          { clerkId: data.id },
          userData
        );

        return res.json({
          success: true,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await User.findOneAndDelete({
          clerkId: data.id,
        });

        return res.json({
          success: true,
          message: "User deleted successfully",
        });
      }

      default: {
        return res.json({
          success: true,
          message: "Webhook event ignored",
        });
      }
    }
  } catch (error) {
    console.log("Webhook Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  clerkWebhooks,
};
