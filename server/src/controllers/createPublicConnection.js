import { Chatroom, User } from "../models/index.js";
import { DatabaseError } from "../utils/errors.js";

export const createPublicConnection = async (
  socket,
  chatroomName,
  userId,
  cb
) => {
  try {
    const user = await User.findById(userId);
    if (user === null) {
      throw new DatabaseError("User not found");
    }
    const chat = new Chatroom({
      name: chatroomName,
      createdBy: userId,
      currentMembers: [userId],
    });
    user.currentRooms = [...user.currentRooms, chatroomName];
    user.createdRooms = [...user.createdRooms, chatroomName];

    await chat.save();
    socket.emit("chatroom-created", chat, user.name);
    cb(["create-chatroom", chatroomName, "complete"]);

    await user.save();
  } catch (e) {
    if (e.code === 11000) {
      console.log(new DatabaseError("Duplicate room name", e.keyValue.name));
      socket.emit(
        "error",
        new DatabaseError("Duplicate room name", e.keyValue.name)
      );
    }
    socket.emit("error", { ...e });
  }
};
