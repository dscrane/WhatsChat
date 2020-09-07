import api from '../../../api'
import { store } from '../../../store';
import { socket } from "../../../socket";

export const createChatRoom = name => async dispatch => {
  try {
    const { data } = await api.post(
      '/create-chatRoom',
      { name }
    )
    return dispatch({
      type: 'DISPLAY_CHATROOMS',
      payload: data.chats
    })
  } catch (e) {
    dispatch({
      type: 'ERROR',
      error: 'Invalid Name'
    })
  }
}

export const displayChatRooms = () => async dispatch => {
  try {
    const { data } = await api.get('/chats');
    dispatch({
      type: 'DISPLAY_CHATROOMS',
      payload: data.chats
    })
  } catch(e) {
    console.log(e)
  }
}

export const joinChat = chatId => async dispatch => {

  socket.emit('join', chatId, (room) => {
    console.log(`connected to ${room}`)
  })
}

export const fetchMessages = (chatId) => async dispatch => {
  const { data } = await api.get(`/messages/${chatId}`);
  console.log('fetch messages', data)
  dispatch({ type: 'LOAD_MESSAGES', payload: { chatId: data.chatId, messages: data.messages }})
}

const dispatchMessage = (message) => {
  return { type: 'NEW_MESSAGE', payload: message }
}

export const sendMessage = ({ message, chatId, userId }) => async dispatch => {
  console.log(`[MESSAGE]: ${message} ==> [CHAT]: ${chatId} ==> [FROM]: ${userId}`);
  socket.emit('message', {message, chatId, userId})
}

socket.on('return-message', returnMsg => {
  return store.dispatch(dispatchMessage(returnMsg))
})


