import mongoose from "mongoose";

export const chatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    createdBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export const Chatroom = mongoose.model('Chatroom', chatroomSchema);
