import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    userId: {
      type: String
    },
    author: {
      type: String
    },
    chatroomId: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Message', messageSchema)
