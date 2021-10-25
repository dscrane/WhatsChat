import _ from "lodash";
import {
  joinChatroom,
  rejoinChatroom,
  leaveChatroom,
  deleteChatroom,
  fetchMessages,
  newMessage,
  createPrivateConnection,
  fetchInitialData,
} from "../controllers/index.js";

export const socketConfig = (io) => {
  io.use((socket, next) => {
    console.log("middleware hit");

    socket.data =
      Object.keys(socket.handshake.auth).length != 0
        ? socket.handshake.auth
        : _.omit(socket.handshake.query, ["EIO", "transport"]);

    next();
  });
  io.on("connection", async (socket) => {
    socket.onAny((event, ...args) => {
      console.log("socketdata", socket.data);
      //   // console.log(socket);
      //   !socket.handshake.auth.userId
      //     ? console.log("query: ", socket.handshake.query)
      //     : console.log("auth: ", socket.handshake.auth);
    });
    // Emit initialization info
    socket.on("fetch-initial-data", (cb) => {
      fetchInitialData(socket, cb);
    });
    // Define create chatroom event
    socket.on("create-public", (chatroomName, userId, cb) =>
      createPrivateConnection(socket, chatroomName, userId, cb)
    );

    socket.on("create-private", (username, cb) => {
      createPrivateConnection(io, socket, username, cb);
    });
    // Define join chatroom event
    socket.on(
      "join-chatroom",
      (newChatroomName, oldChatroomName, userName, cb) =>
        joinChatroom(socket, newChatroomName, oldChatroomName, userName, cb)
    );
    socket.on(
      "rejoin-chatroom",
      (newChatroomName, oldChatroomName, userName, cb) =>
        rejoinChatroom(socket, newChatroomName, oldChatroomName, userName, cb)
    );
    // Define fetch message event
    socket.on("fetching-messages", (chatroomName, cb) =>
      fetchMessages(socket, chatroomName, cb)
    );
    // Define leave event
    socket.on("leave-chatroom", (chatroomId, username, cb) =>
      leaveChatroom(socket, chatroomId, username, cb)
    );
    // Define delete event
    socket.on("delete-chatroom", (chatroomName, cb) =>
      deleteChatroom(io, chatroomName, cb)
    );
    // Define message event
    socket.on("new-message", (message, cb) => {
      newMessage(io, socket, message, cb);
    });
  });
};
