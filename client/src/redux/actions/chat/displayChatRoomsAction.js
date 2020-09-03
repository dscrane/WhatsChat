import api from '../../../api';

export const displayChatRooms = () => async dispatch => {
  try {
    const { data } = await api.get('/chats');
    console.log(data)
    dispatch({
      type: 'DISPLAY_CHATROOMS',
      payload: data.chats
    })
  } catch(e) {
    console.log(e)
  }
}
