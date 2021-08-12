import _ from "lodash";
import {
  ADD_CHATROOM,
  DISPLAY_CHATROOMS,
  RENDER_NEW_MESSAGE,
  RENDER_MESSAGES,
  LOG_OUT,
} from "../types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CHATROOM:
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload,
        },
      };
    case DISPLAY_CHATROOMS:
      return {
        ..._.mapKeys(action.payload, "_id"),
      };
    case RENDER_NEW_MESSAGE:
      return {
        ...state,
        [action.payload.chatroomId]: {
          ...state[action.payload.chatroomId],
          messages: [
            ...state[action.payload.chatroomId].messages,
            action.payload.message,
          ],
        },
      };
    case RENDER_MESSAGES:
      return {
        ...state,
        [action.payload.chatroomId]: {
          ...state[action.payload.chatroomId],
          messages: [...action.payload.messages],
        },
      };
    case LOG_OUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
