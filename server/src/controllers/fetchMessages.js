import { Message } from "../models/index.js";

export const fetchMessages = async (socket, chatroomName, cb) => {
  let messages = await Message.find({ chatroomName: chatroomName })
    .limit(50)
    .sort({ createdAt: 1 });
  messages = [...messages];
  await socket.emit("fetched-messages", chatroomName, messages);
};
