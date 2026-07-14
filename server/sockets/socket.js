const { Server } = require("socket.io");
const { verifyToken } = require("@clerk/backend");
const { setIO } = require("./socketServer");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  setIO(io);

  // Runs before a socket is allowed to connect.
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

    io.emit("online-users-updated");

    console.log(
      `⚡ User connected: ${socket.clerkId} — socket ${socket.id}`
    );

    socket.on("disconnect", () => {
      io.emit("online-users-updated");

      console.log(
        `❌ User disconnected: ${socket.clerkId} — socket ${socket.id}`
      );
    });
  });


  return io;
};

module.exports = initializeSocket;