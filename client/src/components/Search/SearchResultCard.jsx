import Avatar from "../Common/Avatar";

const SearchResultCard = ({
  searchedUser,
  relationshipStatus,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
}) => {
  if (!searchedUser) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-4">
        <Avatar
          src={searchedUser.imageUrl}
          alt={searchedUser.username}
          size={64}
          isOnline={searchedUser.isOnline}
          showStatus
        />

        <div>
          <h3 className="text-xl font-semibold">{searchedUser.username}</h3>
          <p className="text-sm text-gray-500">{searchedUser.email}</p>
          <p
            className={`text-sm ${
              searchedUser.isOnline ? "text-green-600" : "text-gray-500"
            }`}
          >
            {searchedUser.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {relationshipStatus === "none" && (
        <button
          onClick={onSendFriendRequest}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Send Friend Request
        </button>
      )}

      {relationshipStatus === "pending_sent" && (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-gray-600"
        >
          Request Sent
        </button>
      )}

      {relationshipStatus === "pending_received" && (
        <div>
          <p className="mb-3 text-gray-700">
            This user sent you a friend request.
          </p>

          <div className="flex gap-2">
            <button
              onClick={onAcceptFriendRequest}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Accept
            </button>

            <button
              onClick={onDeclineFriendRequest}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {relationshipStatus === "friends" && (
        <p className="font-medium text-green-700">
          You are already friends with this user.
        </p>
      )}
    </div>
  );
};

export default SearchResultCard;