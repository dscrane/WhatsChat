import {
  joinChatroom,
  rejoinChatroom,
  leaveChatroom,
  deleteChatroom,
  fetchMessages,
  newMessage,
  createChatroom,
  fetchInitialData,
} from "../controllers/index.js";
import { log } from "../utils/logs.js";

export const socketConfig = (io) => {
  io.on("connection", async (socket) => {
    log.socket(socket.id, "connected");
    // Emit initialization info
    socket.on("fetch-initial-data", (userId) =>
      fetchInitialData(socket, userId)
    );
    // Define create chatroom event
    socket.on("create-chatroom", (chatroomName, userId, cb) =>
      createChatroom(socket, chatroomName, userId, cb)
    );
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
