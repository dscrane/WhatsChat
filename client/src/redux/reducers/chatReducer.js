import _ from 'lodash'
import {
  ADD_CHATROOM,
  DISPLAY_CHATROOMS,
  NEW_MESSAGE,
  LOAD_MESSAGES,
  CLOSE_CHAT, LOG_OUT
} from '../types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_CHATROOM:
      console.log('[ADD_CHATROOM]:', action.payload)
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload
        }
      }
    case DISPLAY_CHATROOMS:
      console.log('[DISPLAY_CHATROOMS]:', action.payload)
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id')
      }
    case CLOSE_CHAT:
      console.log('[CLOSE_CHAT]:', action.payload);
      return {
        ...state,
        ..._.omit(state, action.payload)
      }
    case NEW_MESSAGE:
      console.log('[NEW_MESSAGE]:', action.payload)
      return {
        ...state,
        [action.payload.chatRoomId]: {
          ...state[action.payload.chatRoomId],
          messages: [
            ...state[action.payload.chatRoomId].messages,
            action.payload.message
          ]
        }
      }
    case LOAD_MESSAGES:
      console.log('[LOAD_MESSAGES]:', action.payload)
      return {
        ...state,
        [action.payload.chatRoomId]: {
          ...state[action.payload.chatRoomId],
          messages: [
            ...state[action.payload.chatRoomId].messages,
            ...action.payload.messages
          ]
        }
      }
    case LOG_OUT:
      console.log('[LOG_OUT]:', action.payload)
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state
  }
}