import { log } from "../utils/logs.js";

export const joinChatroom = async (
  socket,
  newChatroomName,
  oldChatroomName,
  userName,
  cb
) => {
  await socket.leave(oldChatroomName);
  await socket.join(newChatroomName);
  log.socket(userName, `has joined room`, newChatroomName);

  cb(`%cjoin-room %c${newChatroomName} %ccomplete`);

  await socket.emit("fetch-messages", newChatroomName);
};
