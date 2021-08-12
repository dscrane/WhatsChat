import api from "../../../config/api";
import history from "../../../config/history";
import { socket } from "../../../config/socket";
import {
  DISPLAY_CHATROOMS,
  NEW_MESSAGE,
  LOAD_MESSAGES,
  CLOSE_CHAT,
  ADD_CHATROOM,
} from "../../types";
import {log} from "../../../utils/log";

/* ----   ADD_CHATROOM ACTION CREATOR    ---- */
export const createChatRoom = (name, userId) => async (dispatch) => {
  try {
    const { data } = await api.post("/create-chatRoom", {
      name,
      createdBy: userId,
    });
    dispatch({
      type: ADD_CHATROOM,
      payload: { ...data.chat, messages: [] },
    });
    history.push(`/chats/${data.chat._id}`);
  } catch (e) {
    dispatch({
      type: "ERROR",
      error: "Invalid Name",
    });
  }
};
/* ----   ****    ---- */

/* ----   DISPLAY_CHATROOMS ACTION CREATOR    ---- */
export const displayChatRooms = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get("/MessagesDisplay");
    const chatRooms = data.chats.map((chat) => {
      const messages =
        getState().chatRooms.length !== 0
          ? getState().chatRooms[chat._id].messages
          : [];
      return { ...chat, messages: [...messages] };
    });
    dispatch({
      type: DISPLAY_CHATROOMS,
      payload: { ...chatRooms },
    });
  } catch (e) {
    console.log(e);
  }
};
/* ----   ****    ---- */

/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
export const joinChatRoom = (chatRoomId, userName) => async (dispatch) => {
  socket.data = userName
  socket.emit("join", { room: chatRoomId, userName: userName }, (ack) => log.ack(ack))

};
/* ----   ****    ---- */

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatRoom = (chatRoomId, userName) => async (dispatch) => {
  socket.emit("leave", { room: chatRoomId, userName: userName }, (room) => {
    console.log(`leaving ${room}`);
  });
};
/* ----   ****    ---- */

/* ----   CLOSE_CHATROOM ACTION CREATOR    ---- */
export const closeChat = (chatRoomId) => async (dispatch) => {
  socket.emit("leave", { room: chatRoomId });
  dispatch({
    type: CLOSE_CHAT,
    payload: chatRoomId,
  });
};
/* ----   ****    ---- */

/* ----   FETCH_MESSAGES ACTION CREATOR    ---- */
export const fetchMessages = (chatRoomId) => async (dispatch) => {
  const { data } = await api.get(`/messages?chatRoomId=${chatRoomId}`);
  dispatch({
    type: LOAD_MESSAGES,
    payload: { chatRoomId, messages: data.messages },
  });
};
/* ----   ****    ---- */

/* ----   NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessage =
  ({ chatRoomId, message, userId, author }) =>
  async (dispatch) => {
    console.log("send message ran");
    console.log(chatRoomId);
    socket.emit("message", { chatRoomId, message, userId, author });
  };

export const receiveMessage = (message) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: { chatRoomId: message.chatRoomId, message: message },
  });
};

/* ----   ****    ---- */

// Currently Unused System Actions
// socket.on(
//   'system-welcome',
//   ({userName, chatRoomId, type} ) => {
//     console.log('welcome ran')
//     return socket.emit('message', {
//       chatRoomId,
//       message: `${type} ${userName}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
//
// socket.on(
//   'system-join',
//   ({ userName, type, chatRoomId }) => {
//     console.log('join ran')
//     socket.emit('message', {
//       chatRoomId,
//       message: `${userName} has ${type}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
//
// socket.on('system-leave',
//   ({ userName, type, chatRoomId }) => {
//   console.log('leave ran')
//     socket.emit('message', {
//       chatRoomId,
//       message: `${userName} has ${type}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
