import { log } from "../utils/logs.js"
import { default as Message } from "../models/message.js";

export const joinChatroom = async (socket, chatroomId, userName, cb) => {

  socket.join(chatroomId);
  log.socket(socket.id, `has joined room`, chatroomId)
  cb("%cjoin-room complete")

  const joinedMessage = {
    message: `You have entered the chat`,
    author: "system",
    chatroomId: chatroomId,
  }

  let messages = await Message.find({chatroomId: chatroomId}).limit(50).sort({createdAt: 1});
  messages = [...messages, joinedMessage]
  socket.emit("fetched-messages", chatroomId, messages);


  const joiningMessage = {
    message: `${userName} has entered the chat`,
    author: "system",
    type: "system-return"
  }
  // socket.emit("return-message", chatroomId, { ...joinedMessage });
  socket.broadcast.emit("return-message", chatroomId, { ...joiningMessage })
}