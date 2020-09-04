import api from '../../../api';

export const fetchMessages = (chatId) => async dispatch => {
  const { data } = await api.get(`/messages/${chatId}`);
  console.log('fetch messages', data)
  dispatch({ type: 'LOAD_MESSAGES', payload: { chatId: data.chatId, messages: data.messages }})
}