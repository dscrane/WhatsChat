import { default as Message } from "../models/message.js";
import { joinChatroom } from "../controllers/joinChatroom.js"
import { leaveChatroom } from "../controllers/leaveChatroom.js"
import { deleteChatroom } from "../controllers/deleteChatroom.js"
import { User } from "../models/user.js";
import { log } from "../utils/logs.js"

export const socketConfig = (io) => {
  io.on("connection", async (socket) => {
    log.socket(socket.id, "connected");
    // Define join event
    socket.on("join-chatroom", (chatroomId, userName, cb) => joinChatroom(socket, chatroomId, userName, cb));
    // Define leave event
    socket.on("leave-chatroom", (chatroomId, username, cb) => leaveChatroom(socket, chatroomId, username, cb));
    // Define delete event
    socket.on("delete-chatroom", (chatroomId, username, cb) => deleteChatroom(socket, chatroomId, username, cb))
    // Define message event
    socket.on("message", async (message) => {
      try {
        const newMsg = new Message(message);
        const returnMsg = { _id: newMsg._id, ...message };
        io.sockets.in(message.chatroomId).emit("return-message", message.chatroomId, returnMsg);
        await newMsg.save();
      } catch (e) {
        console.log(e);
      }
    });
  });
}