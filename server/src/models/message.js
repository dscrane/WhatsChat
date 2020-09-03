require('dotenv').config();
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    user: {
      type: String
    },
    chatId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema)