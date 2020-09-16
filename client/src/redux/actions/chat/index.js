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
export const displayChatRooms = () => async dispatch => {
  try {
    const { data } = await api.get('/chats');
    const chatRooms = data.chats.map(chat => {
      return {...chat, messages:[]}
    })
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
export const joinChatRoom = (chatId, userName) => async dispatch => {
  socket.emit('join', { room: chatId, userName:userName }, (room) => {
    console.info(`connected to ${room}`)
  })
}
/* ----   ****    ---- */

/* ----   LEAVE_CHATROOM ACTION CREATOR    ---- */
export const leaveChatRoom = (chatId, userName) => async dispatch  => {
  socket.emit('leave', { room: chatId, userName: userName }, room => {
    console.log(`leaving ${room}`)
  })
}
/* ----   ****    ---- */

/* ----   CLOSE_CHATROOM ACTION CREATOR    ---- */
export const closeChat = (chatId) => async dispatch => {
  socket.emit('leave', { room: chatId })
  dispatch({
    type: CLOSE_CHAT,
    payload: chatId
  })
}
/* ----   ****    ---- */

/* ----   FETCH_MESSAGES ACTION CREATOR    ---- */
export const fetchMessages = (chatRoomId) => async dispatch => {
  const { data } = await api.get(`/messages/${chatRoomId}`);
  dispatch({ type: LOAD_MESSAGES, payload: {chatRoomId, messages: data.messages }})
}
/* ----   ****    ---- */

/* ----   NEW_MESSAGE ACTION CREATOR    ---- */
export const sendMessage = ({ message, chatRoomId, userId, author }) => async dispatch => {
  console.log(`[MESSAGE]: ${message} ==> [CHAT]: ${chatRoomId} ==> [FROM]: ${author}`);
  socket.emit('message', {message, chatRoomId, userId, author})
}

const dispatchMessage = (messageType, message) => {
  return { type: messageType, payload: {chatRoomId: message.chatRoomId, message: message} }
}

socket.on('return-message', returnMsg => {
  store.dispatch(dispatchMessage(NEW_MESSAGE, returnMsg))
})
/* ----   ****    ---- */

// socket.on('welcome-message', ( userName ) => console.log(userName))

// socket.on('bot-join-message', (userName) => console.log(userName))