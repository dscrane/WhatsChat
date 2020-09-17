require('dotenv').config();
const mongoose = require('mongoose');

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
    chatRoomId: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema)