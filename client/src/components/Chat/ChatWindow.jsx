import { useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import socket from "../../services/socket";
import toast from "react-hot-toast";

const ChatWindow = ({ friend, messages, setMessagesByFriend, isTyping, }) => {

    const [message, setMessage] = useState("");
    const typingTimeoutRef = useRef(null);


    const handleTyping = (value) => {
  console.log("Typing locally:", value);

  socket.emit("typing:start", {
    receiverClerkId: friend.clerkId,
  });

  clearTimeout(typingTimeoutRef.current);

  if (!value.trim()) {
    socket.emit("typing:stop", {
      receiverClerkId: friend.clerkId,
    });

    return;
  }

  typingTimeoutRef.current = setTimeout(() => {
    socket.emit("typing:stop", {
      receiverClerkId: friend.clerkId,
    });
  }, 1000);
};

    const handleSendMessage = () => {
        const content = message.trim();

        if (!content) return;

        socket.emit(
            "message:send",
            {
            receiverClerkId: friend.clerkId,
            message: content,
            },
            (response) => {
            if (!response?.success) {
                toast.error(response?.message || "Failed to send message");
                return;
            }

            const savedMessage = response.message;

            setMessagesByFriend((currentMessages) => ({
                ...currentMessages,
                [friend._id]: [
                ...(currentMessages[friend._id] || []),
                savedMessage,
                ],
            }));

            setMessage("");
            }
        );
        };

    return (
        <section>
        <ChatHeader friend={friend} isTyping={isTyping} />

        {friend.isOnline ? (
            <>
                <MessageList messages={messages} />

                <MessageInput
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={handleSendMessage}
                    onTyping={handleTyping}
                />
            </>
        ) : (
            <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
            User is not available. You cannot start chatting right now.
            </div>
        )}
        </section>
    );
};

export default ChatWindow;