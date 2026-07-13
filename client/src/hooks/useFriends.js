import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const useFriends = () => {
  const { getToken } = useAuth();

  const [friends, setFriends] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [friendsError, setFriendsError] = useState("");

  const fetchFriends = useCallback(async () => {
    setIsLoadingFriends(true);
    setFriendsError("");

    try {
      await setAuthToken(getToken);

      const response = await api.get("/friends");

      setFriends(response.data);
    } catch (error) {
      console.error("Fetch friends failed:", error);

      setFriendsError(
        error.response?.data?.message || "Failed to load friends"
      );
    } finally {
      setIsLoadingFriends(false);
    }
  }, [getToken]);

  const removeFriend = async (friendId) => {
    try {
      await setAuthToken(getToken);

      const response = await api.delete(`/friends/${friendId}`);

      setFriends((currentFriends) =>
        currentFriends.filter((friend) => friend._id !== friendId)
      );

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to remove friend",
      };
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    isLoadingFriends,
    friendsError,
    refreshFriends: fetchFriends,
    removeFriend,
  };
};

export default useFriends;