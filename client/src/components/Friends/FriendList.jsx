import FriendCard from "./FriendCard";

const FriendList = ({ friends, selectedFriend, onSelectFriend, onRemoveFriend, unreadByFriend, }) => {
  const onlineFriends = friends.filter((friend) => friend.isOnline);
  const offlineFriends = friends.filter((friend) => !friend.isOnline);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Your network
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Friends{" "}
            <span className="font-semibold">
              ({friends.length})
            </span>
          </h2>
        </div>
      </div>

      {friends.length === 0 && (
        <p className="text-gray-500">No friends yet.</p>
      )}

      {onlineFriends.length > 0 && (
        <>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Online
            </h3>

            <span className="text-xs font-medium text-gray-400">
              {onlineFriends.length}
            </span>
          </div>

          {onlineFriends.map((friend) => (
          <FriendCard
            key={friend._id}
            friend={friend}
            isSelected={selectedFriend?._id === friend._id}
            unreadCount={unreadByFriend[friend._id] || 0}
            onSelectFriend={onSelectFriend}
            onRemoveFriend={onRemoveFriend}
          />
          ))}
        </>
      )}

      {offlineFriends.length > 0 && (
        <>
          <div className="mb-3 mt-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300" />

            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Offline
            </h3>

            <span className="text-xs font-medium text-gray-400">
              {offlineFriends.length}
            </span>
          </div>

          {offlineFriends.map((friend) => (
          <FriendCard
            key={friend._id}
            friend={friend}
            isSelected={selectedFriend?._id === friend._id}
            unreadCount={unreadByFriend[friend._id] || 0}
            onSelectFriend={onSelectFriend}
            onRemoveFriend={onRemoveFriend}
          />
          ))}
        </>
      )}
    </section>
  );
};

export default FriendList;