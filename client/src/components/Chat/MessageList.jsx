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
    <div className="min-h-[420px] max-h-[60vh] overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
      {messages.length === 0 && (
        <div className="flex min-h-[370px] items-center justify-center">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-700">
              No messages yet
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Send a message to start the conversation.
            </p>
          </div>
        </div>
      )}

      {messages.map((message, index) => {
        const isOwnMessage = message.senderClerkId === user?.id;
        const previousMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        const startsGroup =
          !previousMessage ||
          previousMessage.senderClerkId !== message.senderClerkId;

        const endsGroup =
          !nextMessage ||
          nextMessage.senderClerkId !== message.senderClerkId;

        return (
          <div
            key={message._id}
            className={`flex ${
              isOwnMessage ? "justify-end" : "justify-start"
            } ${startsGroup ? "mt-3" : "mt-1"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 transition-all ${
                isOwnMessage
                  ? `bg-blue-600 text-white shadow-sm ${
                      startsGroup && endsGroup
                        ? "rounded-2xl"
                        : startsGroup
                          ? "rounded-2xl rounded-br-md"
                          : endsGroup
                            ? "rounded-2xl rounded-tr-md"
                            : "rounded-l-2xl rounded-r-md"
                    }`
                  : `border border-gray-100 bg-white text-gray-900 shadow-sm ${
                      startsGroup && endsGroup
                        ? "rounded-2xl"
                        : startsGroup
                          ? "rounded-2xl rounded-bl-md"
                          : endsGroup
                            ? "rounded-2xl rounded-tl-md"
                            : "rounded-r-2xl rounded-l-md"
                    }`
              }`}
            >
              <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
                {message.content}
              </p>

              <div className="mt-2 flex items-center justify-end gap-2">
                <p
                  className={`text-[11px] ${
                    isOwnMessage ? "text-blue-100/90" : "text-gray-400"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {isOwnMessage && (
                  <p className="text-[11px] text-blue-100/90">
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