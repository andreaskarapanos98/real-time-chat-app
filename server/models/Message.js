const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      trim: true,
      default: "",
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },

    attachmentUrl: {
      type: String,
      default: null,
    },

    attachmentName: {
      type: String,
      default: null,
    },

    attachmentSize: {
      type: Number,
      default: null,
    },

    readAt: {
      type: Date,
      default: null,
    },

    editedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  sender: 1,
  receiver: 1,
  createdAt: 1,
});

messageSchema.pre("validate", function validateMessageContent() {
  const hasText = Boolean(this.content?.trim());
  const hasAttachment = Boolean(this.attachmentUrl);

  if (!hasText && !hasAttachment) {
    throw new Error("A message must contain text or an attachment");
  }
});

module.exports = mongoose.model("Message", messageSchema);