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

    if (!message.trim()) return;

    onSendMessage();

    inputRef.current?.focus();
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const typingTimeoutRef = useRef(null);

  const emojiPickerRef = useRef(null);

  const inputRef = useRef(null);

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
    <form
      onSubmit={handleSubmit}
      className="relative mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50"
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(event) => {
          const value = event.target.value;

          setMessage(value);
          onTyping(value);
        }}
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm transition outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <button
        type="button"
        onClick={() => setShowEmojiPicker((current) => !current)}
        className={`rounded-xl p-2.5 transition-all duration-200 ${
          showEmojiPicker
            ? "bg-blue-100 text-blue-600"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        <Smile size={22} />
      </button>

      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-14 right-0 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessage((currentMessage) => currentMessage + emojiData.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!message.trim()}
        className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;