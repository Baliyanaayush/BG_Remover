const User = require("../models/user");
const { verifyWebhook } = require("@clerk/express/webhooks");
const { getAuth } = require("@clerk/express");
const axios = require("axios");
const FormData = require("form-data");
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
    console.error(" CREDIT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const removeBackground = async (req, res) => {
  try {


    // ================================
    // Clerk authentication
    // ================================
    const { userId, isAuthenticated } = getAuth(req);

    console.log("Authenticated:", isAuthenticated);
    console.log("User ID:", userId);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // ================================
    // Check uploaded image
    // ================================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    console.log("🖼️ Image:", req.file.originalname);
    console.log("📦 Size:", req.file.size);
    console.log("👤 User:", userId);

    // ================================
    // Find user
    // ================================
    const userData = await User.findOne({
      clerkId: userId,
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================================
    // Check your app credits
    // ================================
    if (userData.creditBalance <= 0) {
      return res.status(402).json({
        success: false,
        message: "No credits remaining",
      });
    }

    // ================================
    // Create multipart form
    // ================================
    const formData = new FormData();

    formData.append("image_file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    formData.append("size", "auto");

    console.log("🚀 Sending image to remove.bg...");

    // ================================
    // Call remove.bg
    // ================================
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        },

        // Don't force arraybuffer for errors.
        // Let Axios receive normal error data.
        responseType: "arraybuffer",

        validateStatus: () => true,

        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("remove.bg status:", response.status);

    // ================================
    // Handle remove.bg error
    // ================================
    if (response.status !== 200) {
      let errorData;

      try {
        const text = Buffer.from(response.data).toString("utf8");
        errorData = JSON.parse(text);
      } catch {
        errorData = {
          message: Buffer.from(response.data).toString("utf8"),
        };
      }

      console.error(
        "❌ remove.bg API ERROR:",
        JSON.stringify(errorData, null, 2)
      );

      return res.status(response.status).json({
        success: false,
        message:
          errorData?.errors?.[0]?.title ||
          errorData?.message ||
          "remove.bg failed to process the image",
      });
    }

    // ================================
    // Success
    // ================================
    console.log("✅ Background removed successfully");

    // Deduct one of YOUR app credits
    userData.creditBalance -= 1;

    await userData.save();

    console.log(
      "💳 Remaining credits:",
      userData.creditBalance
    );

    // ================================
    // Return PNG
    // ================================
    res.setHeader("Content-Type", "image/png");

    return res.send(response.data);

  } catch (error) {
    console.error("❌ Remove Background Error:");

    if (error.response?.data) {
      try {
        const text = Buffer.from(error.response.data).toString("utf8");
        console.error(text);
      } catch {
        console.error(error.response.data);
      }
    } else {
      console.error(error.message);
    }

    return res.status(500).json({
      success: false,
      message: "Background removal failed",
    });
  }
};

module.exports = {
  removeBackground,
};


module.exports = {
  clerkWebhooks,
  userCredit,removeBackground
};


