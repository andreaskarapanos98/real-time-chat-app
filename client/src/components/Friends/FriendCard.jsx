import Avatar from "../Common/Avatar";
import { UserMinus } from "lucide-react";

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
      className={`group relative mb-2 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
        isSelected
          ? "border-blue-200 bg-blue-50 shadow-sm"
          : unreadCount > 0
            ? "border-blue-100 bg-blue-50/70 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
            : "border-transparent hover:-translate-y-0.5 hover:border-gray-200 hover:bg-white hover:shadow-sm"
      }`}
    >

      {isSelected && (
        <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600" />
      )}

      <Avatar
        src={friend.imageUrl}
        alt={friend.username}
        isOnline={friend.isOnline}
        showStatus
      />

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-sm font-semibold ${
            isSelected ? "text-blue-900" : "text-gray-900"
          }`}
        >
          {friend.username}
        </h3>

        <p
          className={`mt-0.5 text-xs font-medium ${
            friend.isOnline ? "text-green-600" : "text-gray-400"
          }`}
        >
          {friend.isOnline ? "Active now" : "Offline"}
        </p>
      </div>

      {unreadCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white shadow-sm">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemoveFriend(friend);
        }}
        aria-label={`Remove ${friend.username}`}
        title={`Remove ${friend.username}`}
        className="rounded-lg p-2 text-gray-400 opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
      >
        <UserMinus size={17} />
      </button>
    </div>
  );
};

export default FriendCard;