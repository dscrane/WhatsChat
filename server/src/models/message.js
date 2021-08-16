import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    userId: {
      type: String,
    },
    author: {
      type: String,
    },
    chatroomName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
