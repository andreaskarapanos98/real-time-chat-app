const { getIO } = require("./socketServer");

const isUserOnline = (clerkId) => {
  const io = getIO();
  const room = io.sockets.adapter.rooms.get(clerkId);

  return Boolean(room && room.size > 0);
};

module.exports = {
  isUserOnline,
};