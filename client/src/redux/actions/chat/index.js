import api from '../../../api'
import { store } from '../../../store';
import history from "../../../history";
import { socket } from "../../../socket";
import {
  DISPLAY_CHATROOMS,
  NEW_MESSAGE,
  LOAD_MESSAGES,
  CLOSE_CHAT,
  ADD_CHATROOM
} from '../../types'

/* ----   ADD_CHATROOM ACTION CREATOR    ---- */
export const createChatRoom = (name, userId) => async dispatch => {
  try {
    const { data } = await api.post(
      '/create-chatRoom',
      { name, createdBy: userId }
    )
    dispatch({
      type: ADD_CHATROOM,
      payload: {...data.chat, messages: []}
    })
    history.push(`/chats/${data.chat._id}`)
  } catch (e) {
    dispatch({
      type: 'ERROR',
      error: 'Invalid Name'
    })
  }
}
/* ----   ****    ---- */

/* ----   DISPLAY_CHATROOMS ACTION CREATOR    ---- */
export const displayChatRooms = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get('/MessagesDisplay');
    const chatRooms = data.chats.map(chat => {
      const messages = getState().chatRooms.length !== 0 ? getState().chatRooms[chat._id].messages : [];
      return { ...chat, messages: [...messages]}
    })
    console.log('chatRooms', chatRooms)
    dispatch({
      type: DISPLAY_CHATROOMS,
      payload: {...chatRooms}
    })
  } catch(e) {
    console.log(e)
  }
}
/* ----   ****    ---- */

/* ----   JOIN_CHATROOM ACTION CREATOR    ---- */
export const joinChatRoom = (chatRoomId, userName) => async dispatch => {
  socket.emit('join', { room: chatRoomId, userName:userName }, (room) => {
    console.info(`connected to ${room}`)
  })
}
/* ----   ****    ---- */

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatRoom = (chatRoomId, userName) => async dispatch  => {
  socket.emit('leave', { room: chatRoomId, userName: userName }, room => {
    console.log(`leaving ${room}`)
  })
}
/* ----   ****    ---- */

/* ----   CLOSE_CHATROOM ACTION CREATOR    ---- */
export const closeChat = (chatRoomId) => async dispatch => {
  socket.emit('leave', { room: chatRoomId })
  dispatch({
    type: CLOSE_CHAT,
    payload: chatRoomId
  })
}
/* ----   ****    ---- */

/* ----   FETCH_MESSAGES ACTION CREATOR    ---- */
export const fetchMessages = (chatRoomId) => async dispatch => {
  const { data } = await api.get(`/messages?chatRoomId=${chatRoomId}`);
  dispatch({ type: LOAD_MESSAGES, payload: {chatRoomId, messages: data.messages }})
}
/* ----   ****    ---- */

/* ----   NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessage = ({ chatRoomId, message, userId, author }) => async dispatch => {
  console.log('send message ran')
  console.log(chatRoomId)
  socket.emit('message', { chatRoomId, message, userId, author })
}

const dispatchMessage = (messageType, message) => {
  return { type: messageType, payload: {chatRoomId: message.chatRoomId, message: message} }
}

socket.on('return-message', returnMsg => {
  store.dispatch(dispatchMessage(NEW_MESSAGE, returnMsg))
})
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
