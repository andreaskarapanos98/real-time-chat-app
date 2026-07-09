import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";
import FriendList from "../components/Friends/FriendList";
import SearchResultCard from "../components/Search/SearchResultCard";
import SearchForm from "../components/Search/SearchForm";

const ChatPage = () => {
  const { getToken } = useAuth();

  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);

  const searchedUser = searchResult?.user;
  const relationshipStatus = searchResult?.relationshipStatus;

  const fetchFriends = async () => {
    try {
      await setAuthToken(getToken);
      const response = await api.get("/friends");
      setFriends(response.data);
    } catch (error) {
      console.error("Fetch friends failed:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

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
      setSearchResult((prev) => ({
        ...prev,
        relationshipStatus: "pending_sent",
      }));
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

      fetchFriends();
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
  <div className="min-h-screen bg-gray-100">
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Real-Time Chat</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <FriendList friends={friends} />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Search Users</h2>

          <SearchForm
            email={email}
            setEmail={setEmail}
            handleSearchUser={handleSearchUser}
          />

          {error && <p className="mb-4 text-red-600">{error}</p>}

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