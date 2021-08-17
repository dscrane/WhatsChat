import { User, Chatroom } from "../models/index.js";

export const fetchInitialData = async (socket, userId) => {
  const user = await User.findById(userId);

  const fetchChatroomDocument = async (chatroomName) => {
    return Chatroom.findOne({ name: chatroomName });
  };

  const fetchAllChatroomDocuments = async () => {
    return Promise.all(
      user.currentRooms.map((chatroomName) => {
        return fetchChatroomDocument(chatroomName);
      })
    );
  };

  fetchAllChatroomDocuments().then((chatrooms) =>
    socket.emit("initial-data", chatrooms)
  );
};
