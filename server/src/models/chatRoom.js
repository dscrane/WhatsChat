require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = { ChatRoom, chatRoomSchema };