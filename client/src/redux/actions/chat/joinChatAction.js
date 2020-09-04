import { socket } from '../../../socket';

export const joinChat = chatId => async dispatch => {
  console.log('---------')
  console.log('connecting to ', chatId)
  socket.emit('join', chatId, (room) => {
    console.log(`connected to ${room}`)
    console.log('---------')
  })
}
