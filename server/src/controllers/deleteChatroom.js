import { User, Chatroom } from "../models/index.js";

export const deleteChatroom = async (io, chatroomName, cb) => {
  const chatroom = await Chatroom.findOne({ name: chatroomName });

  const fetchUserData = async (userId) => {
    const user = await User.findOne({ _id: userId });

    if (user.createdRooms.includes(chatroomName)) {
      user.createdRooms = user.createdRooms.filter(
        (roomName) => roomName !== chatroomName
      );
    }

    user.currentRooms = user.currentRooms.filter(
      (roomName) => roomName !== chatroomName
    );

    await user.save();
    console.log(user);
  };

  chatroom.currentMembers.forEach((userId) => {
    return fetchUserData(userId);
  });

  // console.log(chatroom);
  await io.sockets.in(chatroomName).emit("chatroom-deleted", chatroomName);
  await io.socketsLeave(chatroomName);

  await Chatroom.deleteOne({ name: chatroomName });
  cb(`%cdelete-chatroom %c${chatroomName} %ccomplete`);
};
