import Avatar from "../Common/Avatar";

const FriendCard = ({ friend }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100 transition cursor-pointer">

      <Avatar
        src={friend.imageUrl}
        alt={friend.username}
        isOnline={friend.isOnline}
        showStatus
      />

      <div>
        <h3 className="font-semibold">
          {friend.username}
        </h3>

        <p
          className={`text-sm ${
            friend.isOnline
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {friend.isOnline ? "Online" : "Offline"}
        </p>
      </div>

    </div>
  );
};

export default FriendCard;