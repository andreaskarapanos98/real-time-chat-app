import Avatar from "../Common/Avatar";

const FriendCard = ({ friend, onRemoveFriend }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-gray-100">
      <Avatar
        src={friend.imageUrl}
        alt={friend.username}
        isOnline={friend.isOnline}
        showStatus
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">{friend.username}</h3>

        <p
          className={`text-sm ${
            friend.isOnline ? "text-green-600" : "text-gray-500"
          }`}
        >
          {friend.isOnline ? "Online" : "Offline"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemoveFriend(friend)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default FriendCard;