import { socket } from '../../../socket';

export const joinChat = chatId => async dispatch => {
  return socket.on('connection', s => {
    dispatch({
      type: 'JOIN_CHAT',
      payload: chatId
    });

    console.log('------------')
    console.log(`socket connect to chat ${chatId}`)
    console.log('------------')

    s.join(chatId);
  })
}