import { log } from "../utils/logs.js";

export const joinChatroom = async (
  socket,
  newChatroomName,
  oldChatroomName,
  userName,
  cb
) => {
  console.log('join room hit')
  if (oldChatroomName) {
    await socket.leave(oldChatroomName)
  }
  log.socket(userName, `has joined room`, newChatroomName);
  await socket.join(newChatroomName);

  cb(['join-room', newChatroomName, 'complete']);
  await socket.emit("fetch-messages", newChatroomName);
};
