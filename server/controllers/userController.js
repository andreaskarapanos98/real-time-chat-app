const User = require("../models/User");

const syncUser = async (req, res) => {
  try {
    const { clerkId, username, email } = req.body;

    if (!clerkId || !username || !email) {
      return res.status(400).json({
        message: "Missing required user data",
      });
    }

    let user = await User.findOne({ clerkId });

    if (user) {
      user.username = username;
      user.email = email;
      await user.save();

      return res.status(200).json(user);
    }

    user = await User.create({
      clerkId,
      username,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Sync user error:", error.message);

    res.status(500).json({
      message: "Server error while syncing user",
    });
  }
};

module.exports = {
  syncUser,
};