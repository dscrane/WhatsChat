import { Chatroom } from "../models/chatroom.js";
import { User } from "../models/user.js";

export const createChatroom = async (socket, chatroomName, userId, cb) => {
  const chat = new Chatroom({ name: chatroomName, createdBy: userId });
  const user = await User.findById(userId);
  user.favoriteRooms = [...user.favoriteRooms, chatroomName];
  user.createdRooms = [...user.createdRooms, chatroomName];

  try {
    await chat.save();
    socket.emit("chatroom-created", chat, user.name);
    cb(`%ccreate-chatroom %c${chatroomName} %ccomplete`);

    await user.save();
  } catch (e) {
    console.log("error occured");
  }
};
