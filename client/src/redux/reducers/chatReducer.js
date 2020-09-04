import _ from 'lodash'

const INITIAL_STATE = {
  chats: {}
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'ADD_CHATROOM':
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
      console.log(action.payload)
      return {
        ...state,
        chats: {
          ...state.chats,
          ..._.mapKeys(action.payload, '_id')
        }
      }
    case 'NEW_MESSAGE':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: {
              ...state.chats[action.payload.chatId],
              [action.payload.message._id]: {
                ...action.payload.message
              }
            }
          }
        }
      }
    case 'LOAD_MESSAGES':
      console.log(action.payload)
      console.log(state.chats)
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            ...state.chats[action.payload.chatId],
            messages: {
              ...state.chats[action.payload.chatId].messages,
              ..._.mapKeys(action.payload.messages, '_id')
            }
          }
        }
      }
    default:
      return state
  }
}