const Message = require("../models/Message");
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const { getIO } = require("../sockets/socketServer");

const getConversation = async (req, res) => {
  try {
    const { friendId } = req.params;

    const currentUser = await User.findOne({
      clerkId: req.clerkId,
    });

    const friend = await User.findById(friendId);

    if (!currentUser || !friend) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const friendship = await FriendRequest.findOne({
      status: "accepted",
      $or: [
        {
          sender: currentUser._id,
          receiver: friend._id,
        },
        {
          sender: friend._id,
          receiver: currentUser._id,
        },
      ],
    });

    if (!friendship) {
      return res.status(403).json({
        message: "You can only view messages with accepted friends",
      });
    }

    const readAt = new Date();

    await Message.updateMany(
      {
        sender: friend._id,
        receiver: currentUser._id,
        readAt: null,
      },
      {
        $set: {
          readAt,
        },
      }
    );

    const io = getIO();

    io.to(friend.clerkId).emit("messages:read", {
      readerClerkId: currentUser.clerkId,
      readAt,
    });

    console.log("✅ messages:read emitted to:", friend.clerkId);


    const messages = await Message.find({
      $or: [
        {
          sender: currentUser._id,
          receiver: friend._id,
        },
        {
          sender: friend._id,
          receiver: currentUser._id,
        },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "clerkId")
      .populate("receiver", "clerkId");

    const formattedMessages = messages.map((message) => ({
      _id: message._id,
      senderId: message.sender._id,
      receiverId: message.receiver._id,
      senderClerkId: message.sender.clerkId,
      receiverClerkId: message.receiver.clerkId,
      content: message.content,
      messageType: message.messageType,
      attachmentUrl: message.attachmentUrl,
      attachmentName: message.attachmentName,
      attachmentSize: message.attachmentSize,
      readAt: message.readAt,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));

    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Get conversation error:", error);

    return res.status(500).json({
      message: "Failed to load conversation",
    });
  }
};

module.exports = {
  getConversation,
};