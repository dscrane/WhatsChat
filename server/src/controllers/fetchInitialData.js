import { User, Chatroom } from "../models/index.js";

export const fetchInitialData = async (socket, userId) => {
  const user = await User.findById(userId);

  const fetchChatroomData = async (chatroomName) => {
    return Chatroom.findOne({ name: chatroomName });
  };

  const fetchAllChatroomData = async () => {
    return Promise.all(
      user.currentRooms.map((chatroomName) => {
        return fetchChatroomData(chatroomName);
      })
    );
  };

  fetchAllChatroomData().then((chatrooms) =>
    socket.emit("initial-data", chatrooms)
  );
};
