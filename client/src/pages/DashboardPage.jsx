import { useEffect, useRef, useState } from "react";
import { useAuth, UserButton  } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { MessageSquarePlus, UserPlus } from "lucide-react";

import FriendList from "../components/Friends/FriendList";
import SearchResultCard from "../components/Search/SearchResultCard";
import SearchForm from "../components/Search/SearchForm";
import ChatWindow from "../components/Chat/ChatWindow";

import useFriends from "../hooks/useFriends";
import useSearchUser from "../hooks/useSearchUser";
import useFriendRequests from "../hooks/useFriendRequests";

import socket from "../services/socket";
import api, { setAuthToken } from "../services/api";



const DashboardPage = () => {
  const { getToken } = useAuth();

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messagesByFriend, setMessagesByFriend] = useState({});
  const [unreadByFriend, setUnreadByFriend] = useState({});
  const [typingByFriend, setTypingByFriend] = useState({});

  const processedMessageIdsRef = useRef(new Set());

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

  const handleRemoveFriend = async (friend) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${friend.username} from your friends?`
    );

    if (!confirmed) return;

    const result = await removeFriend(friend._id);

    if (result.success) {
      if (selectedFriend?._id === friend._id) {
        setSelectedFriend(null);
      }

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

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);

    setUnreadByFriend((currentUnread) => ({
      ...currentUnread,
      [friend._id]: 0,
    }));
  };

  useEffect(() => {
    const handleReceiveMessage = (incomingMessage) => {
      console.log("📨 message:receive", incomingMessage);

      const messageId = String(incomingMessage?._id || "");

      if (!messageId) return;

      if (processedMessageIdsRef.current.has(messageId)) {
        return;
      }

      processedMessageIdsRef.current.add(messageId);

      const senderFriend = friends.find(
        (friend) =>
          friend.clerkId === incomingMessage.senderClerkId
      );

      if (!senderFriend) {
        console.log("Sender not found in friends list");
        return;
      }

      setMessagesByFriend((currentMessages) => ({
        ...currentMessages,
        [senderFriend._id]: [
          ...(currentMessages[senderFriend._id] || []),
          incomingMessage,
        ],
      }));

      const isChatOpen =
        selectedFriend?._id === senderFriend._id;

      if (!isChatOpen) {
        setUnreadByFriend((currentUnread) => ({
          ...currentUnread,
          [senderFriend._id]:
            (currentUnread[senderFriend._id] || 0) + 1,
        }));

        toast(`New message from ${senderFriend.username}`);
      }
    };

    socket.on("message:receive", handleReceiveMessage);

    return () => {
      socket.off("message:receive", handleReceiveMessage);
    };
  }, [friends, selectedFriend]);


  useEffect(() => {
    const handleMessagesRead = ({ readerClerkId, readAt }) => {
      console.log("✅ messages:read received", {
        readerClerkId,
        readAt,
      });

      const readerFriend = friends.find(
        (friend) => friend.clerkId === readerClerkId
      );

      if (!readerFriend) {
        console.log("❌ Reader not found in friends:", readerClerkId);
        return;
      }

      setMessagesByFriend((currentMessages) => ({
        ...currentMessages,
        [readerFriend._id]: (
          currentMessages[readerFriend._id] || []
        ).map((message) =>
          message.receiverClerkId === readerClerkId
            ? {
                ...message,
                readAt,
              }
            : message
        ),
      }));
    };

    socket.on("messages:read", handleMessagesRead);

    return () => {
      socket.off("messages:read", handleMessagesRead);
    };
  }, [friends]);


  useEffect(() => {
    const loadConversation = async () => {
      if (!selectedFriend) return;

      try {
        await setAuthToken(getToken);

        const response = await api.get(
          `/messages/${selectedFriend._id}`
        );

        

        setMessagesByFriend((currentMessages) => ({
          ...currentMessages,
          [selectedFriend._id]: response.data,
        }));

        setUnreadByFriend((currentUnread) => ({
          ...currentUnread,
          [selectedFriend._id]: 0,
        }));
      } catch (error) {
        console.error("Load conversation failed:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load conversation"
        );
      }
    };

    loadConversation();
  }, [selectedFriend, getToken]);

  useEffect(() => {
    const handleTypingStart = ({ senderClerkId }) => {
      const senderFriend = friends.find(
        (friend) => friend.clerkId === senderClerkId
      );

      if (!senderFriend) return;

      setTypingByFriend((currentTyping) => ({
        ...currentTyping,
        [senderFriend._id]: true,
      }));
    };

    const handleTypingStop = ({ senderClerkId }) => {
      const senderFriend = friends.find(
        (friend) => friend.clerkId === senderClerkId
      );

      if (!senderFriend) return;

      setTypingByFriend((currentTyping) => ({
        ...currentTyping,
        [senderFriend._id]: false,
      }));
    };

    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
    };
  }, [friends]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Messaging
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Real-Time Chat
          </h1>
        </div>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Your network
              </span>

              <button
                type="button"
                onClick={() => setSelectedFriend(null)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 active:scale-95"
              >
                <UserPlus size={16} />
                Add friend
              </button>
            </div>
            {isLoadingFriends && (
              <p className="text-gray-500">
                Loading friends...
              </p>
            )}

            {friendsError && (
              <p className="text-red-600">
                {friendsError}
              </p>
            )}

            {!isLoadingFriends && !friendsError && (
              <FriendList
                friends={friends}
                selectedFriend={selectedFriend}
                onSelectFriend={handleSelectFriend}
                onRemoveFriend={handleRemoveFriend}
                unreadByFriend={unreadByFriend}
              />
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg md:col-span-2">
            {selectedFriend ? (
              <ChatWindow
                friend={selectedFriend}
                messages={
                  messagesByFriend[selectedFriend._id] || []
                }
                setMessagesByFriend={setMessagesByFriend}
                isTyping={Boolean(
                  typingByFriend[selectedFriend._id]
                )}
              />
            ) : (
              <>
                <h2 className="mb-4 text-xl font-semibold">
                  Search Users
                </h2>

                <SearchForm
                  email={email}
                  setEmail={setEmail}
                  handleSearchUser={searchUser}
                  isSearching={isSearching}
                />

                {searchError && (
                  <p className="mb-4 text-red-600">
                    {searchError}
                  </p>
                )}

                <SearchResultCard
                  searchedUser={searchedUser}
                  relationshipStatus={relationshipStatus}
                  onSendFriendRequest={
                    handleSendFriendRequest
                  }
                  onAcceptFriendRequest={
                    handleAcceptFriendRequest
                  }
                  onDeclineFriendRequest={
                    handleDeclineFriendRequest
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;