require('dotenv').config();
const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
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

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = { ChatRoom, chatRoomSchema };