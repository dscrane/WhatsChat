import { socket } from '../../../socket';
import { store } from '../../../store';

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



