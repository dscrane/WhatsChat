/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
import { log } from "../utils/log";

export const joinChatroomEmitter = (chatroomId, userName, socket) => {
  socket.emit("join", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatroomEmitter = (chatroomId, userName, socket) => {
  socket.emit("leave", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   DELETE_CHATROOM ACTION CREATOR    ---- */
export const deleteChatroomEmitter = (chatroomId, userName, socket) => {
  socket.emit("delete", chatroomId, userName, (ack) => log.ack(ack));
};
/* ----   ****    ---- */

/* ----   RENDER_NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessageEmitter = (messageData, socket) => {
  socket.emit("message", { ...messageData });
};
