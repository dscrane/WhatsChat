import api from "../../config/api";
import history from "../../config/history";
import {
  DISPLAY_CHATROOMS,
  RENDER_NEW_MESSAGE,
  RENDER_MESSAGES,
  ADD_CHATROOM,
} from "../types";
import { log } from "../../utils/log";
import _ from "lodash";

/* ----   ADD_CHATROOM ACTION CREATOR    ---- */
export const createChatroom = (name, userId) => async (dispatch) => {
  try {
    const { data } = await api.post("/create-chatroom", {
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
export const displayChatrooms = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get("/MessagesDisplay");
    const chatrooms = data.chats.map((chat) => {
      const messages =
        getState().chatrooms.length !== 0
          ? getState().chatrooms[chat._id].messages
          : [];
      return { ...chat, messages: [...messages] };
    });
    dispatch({
      type: DISPLAY_CHATROOMS,
      payload: { ...chatrooms },
    });
  } catch (e) {
    console.log(e);
  }
};
/* ----   ****    ---- */
/* ----   CLOSE_CHATROOM ACTION CREATOR    ---- */
export const closeChatroom = (chatroomId) => (dispatch, getState) => {
  const chatrooms = _.omit(getState().chatrooms, [chatroomId]);
  dispatch({
    type: DISPLAY_CHATROOMS,
    payload: { ...chatrooms },
  });
};
/* ----   ****    ---- */

/* ----   FETCH_MESSAGES ACTION CREATOR    ---- */
export const renderMessages = (chatroomId, messages) => (dispatch) => {
  dispatch({
    type: RENDER_MESSAGES,
    payload: { chatroomId, messages },
  });
};
/* ----   ****    ---- */

export const renderNewMessage = (chatroomId, message) => (dispatch) => {
  dispatch({
    type: RENDER_NEW_MESSAGE,
    payload: { chatroomId, message },
  });
};

/* ----   ****    ---- */

// Currently Unused System Actions
// socket.on(
//   'system-welcome',
//   ({userName, chatroomId, type} ) => {
//     console.log('welcome ran')
//     return socket.emit('message', {
//       chatroomId,
//       message: `${type} ${userName}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
//
// socket.on(
//   'system-join',
//   ({ userName, type, chatroomId }) => {
//     console.log('join ran')
//     socket.emit('message', {
//       chatroomId,
//       message: `${userName} has ${type}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
//
// socket.on('system-leave',
//   ({ userName, type, chatroomId }) => {
//   console.log('leave ran')
//     socket.emit('message', {
//       chatroomId,
//       message: `${userName} has ${type}.`,
//       userId: null,
//       author: 'systemManager'
//     })
//   }
// )
