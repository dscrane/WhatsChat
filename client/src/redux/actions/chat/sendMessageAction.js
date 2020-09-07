import { socket } from '../../../socket';

const dispatchMessage = data => dispatch => {
  return dispatch({type: 'NEW_MESSAGE', payload: data})
}

export const sendMessage = ({ message, chatId, userId }) => async dispatch => {
  console.log(`[MESSAGE]: ${message} ==> [CHAT]: ${chatId} ==> [FROM]: ${userId}`);
  socket.emit('message', { message, chatId, userId })

  console.log(message);
  dispatch({ type: 'NEW_MESSAGE', payload: message})
}

socket.on('return-message', message => {
  console.log(message)
  dispatchMessage( message )
})



