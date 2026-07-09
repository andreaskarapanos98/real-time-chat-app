const { createClerkClient } = require("@clerk/backend");
const User = require("../models/User");

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const syncUser = async (req, res) => {
  try {
    const clerkId = req.clerkId;

    if (!clerkId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const clerkUser = await clerkClient.users.getUser(clerkId);

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const imageUrl = clerkUser.imageUrl;

    const username =
      clerkUser.username ||
      clerkUser.firstName ||
      clerkUser.fullName ||
      email;

    if (!email) {
      return res.status(400).json({
        message: "User email not found in Clerk",
      });
    }

    let user = await User.findOne({ clerkId });

    if (user) {
      user.username = username;
      user.email = email;
      user.imageUrl = imageUrl;
      await user.save();

      return res.status(200).json(user);
    }

    user = await User.create({
      clerkId,
      username,
      email,
      imageUrl,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Sync user error:", error);

    res.status(500).json({
      message: "Server error while syncing user",
    });
  }
};

const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("-__v");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.clerkId === req.clerkId) {
  return res.status(400).json({
    message: "You cannot search for yourself",
  });
}

    return res.status(200).json(user);
  } catch (error) {
    console.error("Search user error:", error);

    return res.status(500).json({
      message: "Server error while searching user",
    });
  }
};

module.exports = {
    syncUser,
    searchUserByEmail,
};