import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const ChatPage = () => {
  const { getToken } = useAuth();
  
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const searchedUser = searchResult?.user;
  const relationshipStatus = searchResult?.relationshipStatus;
  
  const handleSearchUser = async (e) => {
    e.preventDefault();


    setError("");
    setSearchResult(null);

    try {
      await setAuthToken(getToken);

      const response = await api.get(`/users/search?email=${email}`);

      setSearchResult(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSendFriendRequest = async () => {
  if (!searchedUser) return;

  setError("");

  try {
    await setAuthToken(getToken);

    const response = await api.post("/friends/request", {
      receiverId: searchedUser._id,
    });

    alert(response.data.message);
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
  }
};

const handleAcceptFriendRequest = async () => {
  if (!searchResult?.friendRequestId) return;

  setError("");

  try {
    await setAuthToken(getToken);

    const response = await api.patch(
      `/friends/requests/${searchResult.friendRequestId}/accept`
    );

    alert(response.data.message);

    setSearchResult((prev) => ({
      ...prev,
      relationshipStatus: "friends",
    }));
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
  }
};

const handleDeclineFriendRequest = async () => {
  if (!searchResult?.friendRequestId) return;

  setError("");

  try {
    await setAuthToken(getToken);

    const response = await api.patch(
      `/friends/requests/${searchResult.friendRequestId}/decline`
    );

    alert(response.data.message);

    setSearchResult((prev) => ({
      ...prev,
      relationshipStatus: "none",
      friendRequestId: null,
    }));
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div>
      <h1>Chat Page</h1>

      <form onSubmit={handleSearchUser}>
        <input
          type="email"
          placeholder="Search user by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      {searchedUser && (
        <div>
          <img
            src={searchedUser.imageUrl}
            alt={searchedUser.username}
            width="60"
            height="60"
          />

          <h3>{searchedUser.username}</h3>
          <p>{searchedUser.email}</p>
          <p>{searchedUser.isOnline ? "Online" : "Offline"}</p>

          {relationshipStatus === "none" && (
            <button onClick={handleSendFriendRequest}>Send Friend Request</button>
          )}
          {relationshipStatus === "pending_sent" && (
            <button disabled>Request Sent</button>
          )}
          {relationshipStatus === "pending_received" && (
            <div>
              <p>This user sent you a friend request.</p>
              <button onClick={handleAcceptFriendRequest}>Accept</button>
              <button onClick={handleDeclineFriendRequest}>Decline</button>
            </div>
          )}
          {relationshipStatus === "friends" && (
            <p>You are already friends with this user.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPage;