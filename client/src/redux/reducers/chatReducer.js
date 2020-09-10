import _ from 'lodash'
import {
  ADD_CHATROOM,
  DISPLAY_CHATROOMS,
  NEW_MESSAGE,
  LOAD_MESSAGES,
  CLOSE_CHAT, LOG_OUT
} from '../types';

const INITIAL_STATE = {
  defaultChat: null,
  chats: {}
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_CHATROOM:
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
    case DISPLAY_CHATROOMS:
      console.log('[DISPLAY_CHATROOMS]:', action.payload)
      return {
        ...state,
        defaultChat: action.payload[0]._id,
        chats: {
          ...state.chats,
          ..._.mapKeys(action.payload, '_id')
        }
      }
    case CLOSE_CHAT:
      console.log('[CLOSE_CHAT]:', action.payload);
      return {
        ...state,
        chats: {
          ..._.omit(state.chats, action.payload)
        }
      }
    case NEW_MESSAGE:
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
    case LOAD_MESSAGES:
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
    case LOG_OUT:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state
  }
}