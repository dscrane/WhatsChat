require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      minLength: 7
    },
    creator: {
      type: String,
      require: true
    },
    members: [
      {
        type: String,
        require: true
      }
    ],
    currentUsers: [
      {
        type: String,
        require: true
      }
    ],
    private: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

roomSchema.pre('save', async function (next) {
  const room = this;

  if (room.isModified('password')) {
    room.password = await bcrypt.hash(Room.password, 8);
  }

  next();
})

const Room = mongoose.model('room', roomSchema);
module.exports = { Room, roomSchema };