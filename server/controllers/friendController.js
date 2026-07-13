const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        message: "Receiver ID is required",
      });
    }

    const sender = await User.findOne({ clerkId: req.clerkId });

    if (!sender) {
      return res.status(404).json({
        message: "Sender not found",
      });
    }

    if (sender._id.toString() === receiverId) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself",
      });
    }

    const existingRequest = await FriendRequest.findOne({
      sender: sender._id,
      receiver: receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Friend request already sent",
      });
    }

    const reverseRequest = await FriendRequest.findOne({
      sender: receiverId,
      receiver: sender._id,
      status: "pending",
    });

    if (reverseRequest) {
      reverseRequest.status = "accepted";
      await reverseRequest.save();

      return res.status(200).json({
        message: "Friend request accepted automatically",
        friendRequest: reverseRequest,
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: sender._id,
      receiver: receiverId,
    });

    res.status(201).json({
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    console.error("Send friend request error:", error);

    res.status(500).json({
      message: "Server error while sending friend request",
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const currentUser = await User.findOne({ clerkId: req.clerkId });

    if (!currentUser) {
      return res.status(404).json({
        message: "Current user not found",
      });
    }

    const friendRequest = await FriendRequest.findOne({
      _id: requestId,
      receiver: currentUser._id,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    res.status(200).json({
      message: "Friend request accepted",
      friendRequest,
    });
  } catch (error) {
    console.error("Accept friend request error:", error);

    res.status(500).json({
      message: "Server error while accepting friend request",
    });
  }
};

const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const currentUser = await User.findOne({
      clerkId: req.clerkId,
    });

    if (!currentUser) {
      return res.status(404).json({
        message: "Current user not found",
      });
    }

    const friendRequest = await FriendRequest.findOne({
      _id: requestId,
      receiver: currentUser._id,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({
        message: "Friend request not found",
      });
    }

    friendRequest.status = "rejected";

    await friendRequest.save();

    res.status(200).json({
      message: "Friend request declined",
    });

  } catch (error) {
    console.error("Decline friend request error:", error);

    res.status(500).json({
      message: "Server error while declining friend request",
    });
  }
};

const getFriends = async (req, res) => {
  try {
    const currentUser = await User.findOne({
      clerkId: req.clerkId,
    });

    if (!currentUser) {
      return res.status(404).json({
        message: "Current user not found",
      });
    }

    const friendships = await FriendRequest.find({
      status: "accepted",
      $or: [
        { sender: currentUser._id },
        { receiver: currentUser._id },
      ],
    })
      .populate("sender", "username email imageUrl isOnline lastSeen")
      .populate("receiver", "username email imageUrl isOnline lastSeen");

    const friends = friendships.map((friendship) => {
      const friend =
        friendship.sender._id.toString() === currentUser._id.toString()
          ? friendship.receiver
          : friendship.sender;

      return friend;
    });

    res.status(200).json(friends);
  } catch (error) {
    console.error("Get friends error:", error);

    res.status(500).json({
      message: "Server error while getting friends",
    });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.params;

    const currentUser = await User.findOne({
      clerkId: req.clerkId,
    });

    if (!currentUser) {
      return res.status(404).json({
        message: "Current user not found",
      });
    }

    const friendship = await FriendRequest.findOneAndDelete({
      status: "accepted",
      $or: [
        {
          sender: currentUser._id,
          receiver: friendId,
        },
        {
          sender: friendId,
          receiver: currentUser._id,
        },
      ],
    });

    if (!friendship) {
      return res.status(404).json({
        message: "Friendship not found",
      });
    }

    return res.status(200).json({
      message: "Friend removed successfully",
    });
  } catch (error) {
    console.error("Remove friend error:", error);

    return res.status(500).json({
      message: "Server error while removing friend",
    });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriends,
  removeFriend,
};