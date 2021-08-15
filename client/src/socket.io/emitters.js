/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
import { log } from "../utils/log";

export const createChatroomEmitter = (chatroomName, userId, socket) => {
  log.emit("creating chatroom...");
  socket.emit("create-chatroom", chatroomName, userId, (ack) => log.ack(ack));
};

export const joinChatroomEmitter = (
  newChatroomName,
  oldChatroomName,
  userName,
  socket
) => {
  log.emit("joining chatroom...");
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
  log.emit("rejoining chatroom...");
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

/* ----   RENDER_NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessageEmitter = (messageData, socket) => {
  log.emit("sending new message...");
  socket.emit("new-message", { ...messageData }, (ack) => log.ack(ack));
};

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatroomEmitter = (chatroomId, userName, socket) => {
  log.emit("leaving chatroom...");
  socket.emit("leave-chatroom", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   DELETE_CHATROOM ACTION CREATOR    ---- */
export const deleteChatroomEmitter = (chatroomId, userName, socket) => {
  log.emit("deleting chatroom...");
  socket.emit("delete-chatroom", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */
