import FriendCard from "./FriendCard";

const FriendList = ({ friends, selectedFriend, onSelectFriend, onRemoveFriend, unreadByFriend, }) => {
  const onlineFriends = friends.filter((friend) => friend.isOnline);
  const offlineFriends = friends.filter((friend) => !friend.isOnline);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Friends</h2>

      {friends.length === 0 && (
        <p className="text-gray-500">No friends yet.</p>
      )}

      {onlineFriends.length > 0 && (
        <>
          <h3 className="mb-2 text-sm font-semibold uppercase text-green-600">
            🟢 Online ({onlineFriends.length})
          </h3>

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
          <h3 className="mt-6 mb-2 text-sm font-semibold uppercase text-gray-500">
            ⚫ Offline ({offlineFriends.length})
          </h3>

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