import Avatar from "../Common/Avatar";


const ChatHeader = ({ friend, isTyping }) => {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
      <Avatar
        src={friend.imageUrl}
        alt={friend.username}
        isOnline={friend.isOnline}
        showStatus
      />

      <div className="min-w-0">
        <h2 className="truncate text-xl font-semibold tracking-tight text-gray-900">
          {friend.username}
        </h2>

        {isTyping ? (
          <p className="mt-1 text-sm font-medium text-blue-600">
            Typing...
          </p>
        ) : (
          <p
            className={`mt-1 text-sm font-medium ${
              friend.isOnline ? "text-green-600" : "text-gray-400"
            }`}
          >
            {friend.isOnline ? "Active now" : "Offline"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;