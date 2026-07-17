import { useEffect, useRef, useState } from "react";
import socket from "../../services/socket";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

const MessageInput = ({
  message,
  setMessage,
  onSendMessage,
  onTyping,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage();
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const typingTimeoutRef = useRef(null);

  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <form onSubmit={handleSubmit} className="relative mt-6 flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(event) => {
          const value = event.target.value;

          setMessage(value);
          onTyping(value);
        }}
        placeholder="Type a message..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="button"
        onClick={() => setShowEmojiPicker((current) => !current)}
        className={`rounded-lg px-3 py-2 transition-colors ${
          showEmojiPicker
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        }`}
      >
        <Smile size={22} />
      </button>

      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-14 right-0 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessage((currentMessage) => currentMessage + emojiData.emoji);
            }}
          />
        </div>
      )}

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;