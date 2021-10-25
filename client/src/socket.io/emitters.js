/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
import { log } from "../utils/log";

export const createChatroomEmitter = (chatroomName, userId, socket) => {
  socket.emit("create-chatroom", chatroomName, userId);
};

export const joinChatroomEmitter = (
  newChatroomName,
  oldChatroomName,
  userName,
  socket
) => {
  socket.emit(
    "join-chatroom",
    newChatroomName,
    oldChatroomName,
    userName,
  );
};
/* ----   ****    ---- */

export const rejoinChatroomEmitter = (
  newChatroomName,
  oldChatroomName,
  userName,
  socket
) => {
  socket.emit(
    "rejoin-chatroom",
    newChatroomName,
    oldChatroomName,
    userName,
  );
};

export const fetchMessagesEmitter = (chatroomName, socket) => {
  socket.emit("fetching-messages", chatroomName);
};

/* ----   RENDER_NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessageEmitter = (messageData, socket) => {
  socket.emit("new-message", { ...messageData });
};

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatroomEmitter = (chatroomName, userName, socket) => {
  socket.emit("leave-chatroom", chatroomName, userName);
};
/* ----   ****    ---- */

/* ----   DELETE_CHATROOM ACTION CREATOR    ---- */
export const deleteChatroomEmitter = (chatroomName, socket) => {
  socket.emit("delete-chatroom", chatroomName);
};
/* ----   ****    ---- */
