import { log } from "../utils/logs.js";

export const rejoinChatroom = async (
  socket,
  newChatroomName,
  oldChatroomName,
  userName,
  cb
) => {
  await socket.leave(oldChatroomName);
  await socket.join(newChatroomName);
  log.socket(userName, `has joined room`, newChatroomName);

  cb(`%crejoin-room %c${newChatroomName} %ccomplete`);
};
