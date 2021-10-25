import { Chatroom, User } from "../models/index.js";

export const createChatroom = async (socket, chatroomName, userId, cb) => {
  const chat = new Chatroom({
    name: chatroomName,
    createdBy: userId,
    currentMembers: [userId],
  });
  const user = await User.findById(userId);
  user.currentRooms = [...user.currentRooms, chatroomName];
  user.createdRooms = [...user.createdRooms, chatroomName];

  try {
    await chat.save();
    socket.emit("chatroom-created", chat, user.name);

    await user.save();
  } catch (e) {
    console.log("error occured");
  }
};
