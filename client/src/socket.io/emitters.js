/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
import { log } from "../utils/log";

export const joinChatroomEmitter = (
  newChatroomName,
  oldChatroomName,
  userName,
  socket
) => {
  log.emit("joining chat room...");
  socket.emit(
    "join-chatroom",
    newChatroomName,
    oldChatroomName,
    userName,
    (ack) => log.ack(ack)
  );
};
/* ----   ****    ---- */

export const rejoinChatroomEmitter = (
  newChatroomName,
  oldChatroomName,
  userName,
  socket
) => {
  log.emit("rejoining chat room...");
  socket.emit(
    "rejoin-chatroom",
    newChatroomName,
    oldChatroomName,
    userName,
    (ack) => log.ack(ack)
  );
};

export const fetchMessagesEmitter = (chatroomName, socket) => {
  log.emit("fetching messages...");
  socket.emit("fetching-messages", chatroomName, (ack) => log.ack(ack));
};

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatroomEmitter = (chatroomId, userName, socket) => {
  log.emit("leaving chat room...");
  socket.emit("leave-chatroom", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   DELETE_CHATROOM ACTION CREATOR    ---- */
export const deleteChatroomEmitter = (chatroomId, userName, socket) => {
  log.emit("deleting chat room...");
  socket.emit("delete-chatroom", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   RENDER_NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessageEmitter = (messageData, socket) => {
  log.emit("sending new message...");
  socket.emit("message", { ...messageData }, (ack) => log.ack(ack));
};
