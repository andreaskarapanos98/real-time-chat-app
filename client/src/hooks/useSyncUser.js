import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api, { setAuthToken } from "../services/api";

const useSyncUser = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        await setAuthToken(getToken);
        await api.post("/users/sync");
      } catch (error) {
        console.error("User sync failed:", error);
      }
    };

    syncUser();
  }, [isSignedIn, user, getToken]);
};

export default useSyncUser;