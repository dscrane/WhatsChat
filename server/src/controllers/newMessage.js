import { default as Message } from "../models/message.js";

export const newMessage = async (io, socket, message, cb) => {
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
};
