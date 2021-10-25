import { User, Chatroom } from "../models/index.js";

export const deleteChatroom = async (io, chatroomName, cb) => {
  const chatroom = await Chatroom.findOne({ name: chatroomName });

  const fetchUserDocument = async (userId) => {
    // Fetch the current users User document
    const user = await User.findOne({ _id: userId });

    // Remove room from "createdRooms" array if current user created the room
    if (user.createdRooms.includes(chatroomName)) {
      user.createdRooms = user.createdRooms.filter(
        (roomName) => roomName !== chatroomName
      );
    }

    // Remove room from the currently joined rooms array
    user.currentRooms = user.currentRooms.filter(
      (roomName) => roomName !== chatroomName
    );

    // Save the updated user document
    await user.save();
  };

  chatroom.currentMembers.forEach((userId) => {
    return fetchUserDocument(userId);
  });

  await io.sockets.in(chatroomName).emit("chatroom-deleted", chatroomName);
  await io.socketsLeave(chatroomName);

  await Chatroom.deleteOne({ name: chatroomName });
};
