import api from '../../../api'

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