import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const useSearchUser = () => {
  const { getToken } = useAuth();

  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchUser = async (event) => {
    event.preventDefault();

    setSearchError("");
    setSearchResult(null);
    setIsSearching(true);

    try {
      await setAuthToken(getToken);

      const response = await api.get("/users/search", {
        params: { email },
      });

      setSearchResult(response.data);
    } catch (error) {
      setSearchError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsSearching(false);
    }
  };

  const updateRelationship = (relationshipStatus, friendRequestId = undefined) => {
    setSearchResult((previousResult) => {
      if (!previousResult) return previousResult;

      return {
        ...previousResult,
        relationshipStatus,
        friendRequestId:
          friendRequestId === undefined
            ? previousResult.friendRequestId
            : friendRequestId,
      };
    });
  };

  return {
    email,
    setEmail,
    searchResult,
    searchedUser: searchResult?.user,
    relationshipStatus: searchResult?.relationshipStatus,
    searchError,
    isSearching,
    searchUser,
    updateRelationship,
  };
};

export default useSearchUser;