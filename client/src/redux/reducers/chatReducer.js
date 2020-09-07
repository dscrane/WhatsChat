import _ from 'lodash'

const INITIAL_STATE = {
  chats: {}
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'ADD_CHATROOM':
      console.log('[ADD_CHATROOM]:', action.payload)
      return {
        ...state,
        chats: {
          ...state.chats,
          [action._id]: {
            name: action.name,
            _id: action._id,
            messages: {}
          }
        }

      }
    case 'DISPLAY_CHATROOMS':
      console.log('[DISPLAY_CHATROOMS]:', action.payload)
      return {
        ...state,
        chats: {
          ...state.chats,
          ..._.mapKeys(action.payload, '_id')
        }
      }
    case 'NEW_MESSAGE':
      console.log('[NEW_MESSAGE]:', action.payload)
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: {
              ...state.chats[action.payload.chatId].messages,
              [action.payload._id]: {
                ...action.payload
              }
            }
          }
        }
      }
    case 'LOAD_MESSAGES':
      console.log('[LOAD_MESSAGES]:',action.payload)
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: {
              ...state.chats[action.payload.chatId].messages,
              ...action.payload.messages
            }
          }
        }
      }
    default:
      return state
  }
}