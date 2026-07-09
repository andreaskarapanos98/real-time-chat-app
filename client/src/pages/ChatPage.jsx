import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const ChatPage = () => {
  const { getToken } = useAuth();
  
  const [email, setEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [error, setError] = useState("");
  
  const handleSearchUser = async (e) => {
    e.preventDefault();


    setError("");
    setSearchedUser(null);

    try {
      await setAuthToken(getToken);
      
      const response = await api.get(`/users/search?email=${email}`);

      setSearchedUser(response.data);
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

          <button>Send Friend Request</button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;