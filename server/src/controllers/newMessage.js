import { Message } from "../models/index.js";

export const newMessage = async (io, socket, message, cb) => {
  console.log(message);
  try {
    const newMsg = new Message(message);
    await newMsg.save();
    console.log(newMsg)
    const returnMsg = { _id: newMsg._id, ...message, createdAt: newMsg.createdAt};

    io.sockets
      .in(message.chatroomName)
      .emit("return-message", message.chatroomName, returnMsg);
    cb('new-message', returnMsg, 'complete');
  } catch (e) {
    console.log(e);
  }
};
