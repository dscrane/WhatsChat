import { default as Message } from "../models/message.js";
import { joinChatroom } from "../controllers/joinChatroom.js";
import { rejoinChatroom } from "../controllers/rejoinChatroom.js";
import { leaveChatroom } from "../controllers/leaveChatroom.js";
import { deleteChatroom } from "../controllers/deleteChatroom.js";
import { fetchMessages } from "../controllers/fetchMessages.js";
import { User } from "../models/user.js";
import { log } from "../utils/logs.js";

export const socketConfig = (io) => {
  io.on("connection", async (socket) => {
    log.socket(socket.id, "connected");
    // Define join event
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
    socket.on("delete-chatroom", (chatroomId, username, cb) =>
      deleteChatroom(socket, chatroomId, username, cb)
    );
    // Define message event
    socket.on("message", async (message, cb) => {
      try {
        const newMsg = new Message(message);
        const returnMsg = { _id: newMsg._id, ...message };
        io.sockets
          .in(message.chatroomName)
          .emit("return-message", message.chatroomName, returnMsg);
        await newMsg.save();
        cb("%cmessage complete");
      } catch (e) {
        console.log(e);
      }
    });
  });
};
