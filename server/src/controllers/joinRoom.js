import { log } from "../utils/logs.js"
import { default as Message } from "../models/message.js";

export const joinRoom = async (io, socket, cb, chatroomId, userName) => {

  socket.join(chatroomId);
  log.socket(socket.id, `has joined room`, chatroomId)
  cb("%cjoin-room complete")

  const messages = await Message.find({chatroomId: chatroomId}).limit(50).sort({createdAt: 1});
  socket.emit("fetched-messages", chatroomId, messages);

  const joinedMessage = {
      message: `You have entered the chat`,
      author: "system",
      chatroomId: chatroomId,
  }
  const joiningMessage = {
    message: `${userName} has entered the chat`,
    author: "system",
  }
  socket.emit("return-message", chatroomId, { ...joinedMessage });
  socket.broadcast.emit("return-message", chatroomId, { ...joiningMessage })
}