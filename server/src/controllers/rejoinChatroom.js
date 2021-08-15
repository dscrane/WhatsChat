import { log } from "../utils/logs.js";

export const rejoinChatroom = async (
  socket,
  newChatroomName,
  oldChatroomName,
  userName,
  cb
) => {
  console.log(newChatroomName, oldChatroomName);
  await socket.leave(oldChatroomName);
  await socket.join(newChatroomName);
  log.socket(userName, `has joined room`, newChatroomName);
  // const joinedMessage = {
  //   message: `You have entered the chat`,
  //   author: "system",
  //   chatroomName: newChatroomName,
  // };
  // await socket.emit("system-message", newChatroomName, { ...joinedMessage });
  cb(`%crejoin-room %c${newChatroomName} %ccomplete`);
};
