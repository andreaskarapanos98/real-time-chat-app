const { Server } = require("socket.io");
const { verifyToken } = require("@clerk/backend");

const { setIO } = require("./socketServer");

const Message = require("../models/Message");
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  setIO(io);

  // Authenticate every socket before allowing it to connect.
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication token is missing"));
      }

      const verifiedToken = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!verifiedToken.sub) {
        return next(new Error("Invalid authentication token"));
      }

      socket.clerkId = verifiedToken.sub;

      next();
    } catch (error) {
      console.error("Socket authentication failed:", error.message);
      next(new Error("Unauthorized socket connection"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(socket.clerkId);

    console.log(`🏠 ${socket.clerkId} joined personal room`);
    console.log(
      `⚡ User connected: ${socket.clerkId} — socket ${socket.id}`
    );

    io.emit("online-users-updated");

    socket.on(
      "message:send",
      async ({ receiverClerkId, message }, acknowledge) => {
        try {
          const content = message?.trim();

          if (!receiverClerkId || !content) {
            return acknowledge?.({
              success: false,
              message: "Receiver and message are required",
            });
          }

          const [sender, receiver] = await Promise.all([
            User.findOne({ clerkId: socket.clerkId }),
            User.findOne({ clerkId: receiverClerkId }),
          ]);

          if (!sender || !receiver) {
            return acknowledge?.({
              success: false,
              message: "Sender or receiver not found",
            });
          }

          const friendship = await FriendRequest.findOne({
            status: "accepted",
            $or: [
              {
                sender: sender._id,
                receiver: receiver._id,
              },
              {
                sender: receiver._id,
                receiver: sender._id,
              },
            ],
          });

          if (!friendship) {
            return acknowledge?.({
              success: false,
              message: "You can only message accepted friends",
            });
          }

          const senderRoom = io.sockets.adapter.rooms.get(sender.clerkId);
          const receiverRoom = io.sockets.adapter.rooms.get(receiver.clerkId);

          if (!senderRoom?.size || !receiverRoom?.size) {
            return acknowledge?.({
              success: false,
              message: "Both users must be online to chat",
            });
          }

          const savedMessage = await Message.create({
            sender: sender._id,
            receiver: receiver._id,
            content,
            messageType: "text",
          });

          const outgoingMessage = {
            _id: savedMessage._id,
            senderId: sender._id,
            receiverId: receiver._id,
            senderClerkId: sender.clerkId,
            receiverClerkId: receiver.clerkId,
            content: savedMessage.content,
            messageType: savedMessage.messageType,
            attachmentUrl: savedMessage.attachmentUrl,
            attachmentName: savedMessage.attachmentName,
            attachmentSize: savedMessage.attachmentSize,
            readAt: savedMessage.readAt,
            createdAt: savedMessage.createdAt,
            updatedAt: savedMessage.updatedAt,
          };

          io.to(receiver.clerkId).emit(
            "message:receive",
            outgoingMessage
          );

          acknowledge?.({
            success: true,
            message: outgoingMessage,
          });
        } catch (error) {
          console.error("Send message error:", error);

          acknowledge?.({
            success: false,
            message: "Failed to send message",
          });
        }
      }
    );

    socket.on("typing:start", ({ receiverClerkId }) => {
      console.log(
        `⌨️ typing:start from ${socket.clerkId} to ${receiverClerkId}`
      );

      if (!receiverClerkId) return;

      io.to(receiverClerkId).emit("typing:start", {
        senderClerkId: socket.clerkId,
      });
    });

    socket.on("typing:stop", ({ receiverClerkId }) => {
      console.log(
        `⌨️ typing:stop from ${socket.clerkId} to ${receiverClerkId}`
      );

      if (!receiverClerkId) return;

      io.to(receiverClerkId).emit("typing:stop", {
        senderClerkId: socket.clerkId,
      });
    });

    socket.on("disconnect", () => {
      console.log(
        `❌ User disconnected: ${socket.clerkId} — socket ${socket.id}`
      );

      io.emit("online-users-updated");
    });
  });

  return io;
};

module.exports = initializeSocket;