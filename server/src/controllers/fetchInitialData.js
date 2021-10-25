import { User, Chatroom } from "../models/index.js";
import { DatabaseError } from "../utils/errors.js";

export const fetchInitialData = async (socket, cb) => {
  try {
    const user = await User.findById(socket.data.userId);
    if (user === null) {
      throw new DatabaseError("User not found", "UserQueryError");
    }

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

    //   fetchAllChatroomDocuments().then((chatrooms) =>{
    //     console.log(chatrooms);
    //     socket.emit("initial-data", chatrooms)}
    // );

    cb(["initial-data", user._id, "complete"]);
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    socket.emit("error", e);
  }
};
