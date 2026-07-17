const ChatHeader = ({ friend, isTyping }) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-bold">{friend.username}</h2>

      {isTyping ? (
        <p className="text-sm font-medium text-blue-600">
          {friend.username} is typing...
        </p>
      ) : (
        <p
          className={`text-sm ${
            friend.isOnline ? "text-green-600" : "text-gray-500"
          }`}
        >
          {friend.isOnline ? "Online" : "Offline"}
        </p>
      )}
    </div>
  );
};

export default ChatHeader;