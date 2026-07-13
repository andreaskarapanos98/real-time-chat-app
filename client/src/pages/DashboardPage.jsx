import { useState } from "react";
import toast from "react-hot-toast";
import FriendList from "../components/Friends/FriendList";
import SearchResultCard from "../components/Search/SearchResultCard";
import SearchForm from "../components/Search/SearchForm";
import useFriends from "../hooks/useFriends";
import useSearchUser from "../hooks/useSearchUser";
import useFriendRequests from "../hooks/useFriendRequests";

const ChatPage = () => {

  const {
    friends,
    isLoadingFriends,
    friendsError,
    refreshFriends,
    removeFriend,
  } = useFriends();

  const {
    email,
    setEmail,
    searchResult,
    searchedUser,
    relationshipStatus,
    searchError,
    isSearching,
    searchUser,
    updateRelationship,
  } = useSearchUser();

  const {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
  } = useFriendRequests({
    searchResult,
    updateRelationship,
    refreshFriends,
  });

  const fetchFriends = async () => {
    try {
      await setAuthToken(getToken);
      const response = await api.get("/friends");
      setFriends(response.data);
    } catch (error) {
      console.error("Fetch friends failed:", error);
    }
  };

  const handleRemoveFriend = async (friend) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${friend.username} from your friends?`
    );

    if (!confirmed) return;

    const result = await removeFriend(friend._id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSendFriendRequest = async () => {
    const result = await sendFriendRequest(searchedUser);

    if (!result) return;

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleAcceptFriendRequest = async () => {
    const result = await acceptFriendRequest();

    if (!result) return;

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  

  const handleDeclineFriendRequest = async () => {
    const result = await declineFriendRequest();

    if (!result) return;

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100">
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Real-Time Chat</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-lg">

          {isLoadingFriends && (
            <p className="text-gray-500">Loading friends...</p>
          )}

          {friendsError && (
            <p className="text-red-600">{friendsError}</p>
          )}

          {!isLoadingFriends && !friendsError && (
            <FriendList 
              friends={friends} 
              onRemoveFriend={handleRemoveFriend}
            />
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Search Users</h2>

          <SearchForm
            email={email}
            setEmail={setEmail}
            handleSearchUser={searchUser}
            isSearching={isSearching}
          />

          {searchError && (
            <p className="mb-4 text-red-600">{searchError}</p>
          )}

          <SearchResultCard
            searchedUser={searchedUser}
            relationshipStatus={relationshipStatus}
            onSendFriendRequest={handleSendFriendRequest}
            onAcceptFriendRequest={handleAcceptFriendRequest}
            onDeclineFriendRequest={handleDeclineFriendRequest}
          />
        </div>
      </div>
    </div>
  </div>
);
};

export default ChatPage;