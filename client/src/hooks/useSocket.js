import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import socket from "../services/socket";

const useSocket = () => {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const connectSocket = async () => {
      if (!isSignedIn) {
        socket.disconnect();
        return;
      }

      const token = await getToken();

      socket.auth = {
        token,
      };

      socket.connect();
    };

    const handleConnect = () => {
      console.log("⚡ Connected to Socket.IO:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("❌ Disconnected from Socket.IO");
    };

    const handleConnectError = (error) => {
      console.error("Socket connection failed:", error.message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    connectSocket();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [isSignedIn, getToken]);

  return socket;
};

export default useSocket;