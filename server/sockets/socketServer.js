let io = null;

const setIO = (socketServer) => {
  io = socketServer;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO server has not been initialized.");
  }

  return io;
};

module.exports = {
  setIO,
  getIO,
};