import { default as Message } from "../models/message.js";
import { joinRoom } from "../controllers/joinRoom.js"
import { User } from "../models/user.js";
import { log } from "../utils/logs.js"

export const socketConfig = (io) => {
  io.on("connection", async (socket) => {
    log.socket(socket.id, "connected");
    // Define join event
    socket.on("join", (chatroomId, userName, cb) => joinRoom(io, socket, cb, chatroomId, userName));
    // Define leave event
    socket.on("leave", ({ room, userName }) => {
      socket.leave(room, () => {
        console.info(`${userName} leaving room ${room}`);
      });
    });
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