import Avatar from "../Common/Avatar";

const FriendCard = ({
  friend,
  isSelected,
  unreadCount,
  onSelectFriend,
  onRemoveFriend,
}) => {
  return (
    <div
      onClick={() => onSelectFriend(friend)}
      className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition ${
        isSelected
          ? "bg-blue-100"
          : unreadCount > 0
            ? "bg-blue-50 hover:bg-blue-100"
            : "hover:bg-gray-100"
      }`}
    >
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

      {unreadCount > 0 && (
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-bold text-white">
          {unreadCount}
        </span>
      )}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemoveFriend(friend);
        }}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default FriendCard;