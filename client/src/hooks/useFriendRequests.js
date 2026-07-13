import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const useFriendRequests = ({
  searchResult,
  updateRelationship,
  refreshFriends,
}) => {
  const { getToken } = useAuth();

  const sendFriendRequest = async (searchedUser) => {
    if (!searchedUser) return;

    try {
      await setAuthToken(getToken);

      const response = await api.post("/friends/request", {
        receiverId: searchedUser._id,
      });

      updateRelationship("pending_sent");

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Something went wrong",
      };
    }
  };

  const acceptFriendRequest = async () => {
    if (!searchResult?.friendRequestId) return;

    try {
      await setAuthToken(getToken);

      const response = await api.patch(
        `/friends/requests/${searchResult.friendRequestId}/accept`
      );

      updateRelationship("friends");

      refreshFriends();

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Something went wrong",
      };
    }
  };

  const declineFriendRequest = async () => {
    if (!searchResult?.friendRequestId) return;

    try {
      await setAuthToken(getToken);

      const response = await api.patch(
        `/friends/requests/${searchResult.friendRequestId}/decline`
      );

      updateRelationship("none", null);

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Something went wrong",
      };
    }
  };

  return {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
  };
};

export default useFriendRequests;