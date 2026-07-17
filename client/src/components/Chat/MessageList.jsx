import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

const MessageList = ({ messages }) => {
  const { user } = useUser();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="max-h-[420px] min-h-80 space-y-3 overflow-y-auto rounded-lg bg-gray-50 p-4">
      {messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      {messages.map((message) => {
        const isOwnMessage = message.senderClerkId === user?.id;

        return (
          <div
            key={message._id}
            className={`flex ${
              isOwnMessage ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-2 ${
                isOwnMessage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 shadow"
              }`}
            >
              <p>{message.content}</p>

              <div className="mt-1 flex items-center justify-end gap-2">
                <p
                  className={`text-xs ${
                    isOwnMessage ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {isOwnMessage && (
                  <p className="text-xs text-blue-100">
                    {message.readAt ? "Read" : "Sent"}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;