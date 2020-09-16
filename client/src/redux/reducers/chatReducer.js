import _ from 'lodash'
import {
  ADD_CHATROOM,
  DISPLAY_CHATROOMS,
  NEW_MESSAGE,
  LOAD_MESSAGES,
  CLOSE_CHAT, LOG_OUT
} from '../types';

const INITIAL_STATE = {
  defaultChat: '5f52268b6d59e14df8174254',
  chats: {},
  messages: {}
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
        defaultChat: action.defaultChat,
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
      const state1 = {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: {
            ...[action.payload.chatId].messages,
            ...[action.payload.message]
          }
        }
      }
      console.log('===========')
        console.log('STATE:', state1)
      console.log('===========')
        return state1

    case LOAD_MESSAGES:
      console.log('[LOAD_MESSAGES]:',action.payload)
      console.log(action.payload.messages)
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.chatId]: {
            ...[action.payload.chatId].messages,
            ...action.payload.messages
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