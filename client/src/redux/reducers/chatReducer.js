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
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload
        }
      }
    case DISPLAY_CHATROOMS:
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id')
      }
    case CLOSE_CHAT:
      return {
        ...state,
        ..._.omit(state, action.payload)
      }
    case NEW_MESSAGE:
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
      return {
        ...state,
        [action.payload.chatRoomId]: {
          ...state[action.payload.chatRoomId],
          messages: [
            ...action.payload.messages
          ]
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
