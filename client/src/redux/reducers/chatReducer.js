import _ from "lodash";
import {
  ADD_CHATROOM,
  DISPLAY_CHATROOMS,
  RENDER_NEW_MESSAGE,
  RENDER_MESSAGES,
  LOG_OUT,
} from "../types";
import { log } from "../../utils/log";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CHATROOM:
      log.reducer(action.type, action.payload);
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload,
        },
      };
    case DISPLAY_CHATROOMS:
      log.reducer(action.type, action.payload);
      return {
        ..._.mapKeys(action.payload, "name"),
      };
    case RENDER_NEW_MESSAGE:
      log.reducer(action.type, action.payload);
      return {
        ...state,
        [action.payload.chatroomName]: {
          ...state[action.payload.chatroomName],
          messages: [
            ...state[action.payload.chatroomName].messages,
            action.payload.message,
          ],
        },
      };
    case RENDER_MESSAGES:
      log.reducer(action.type, action.payload);
      return {
        ...state,
        [action.payload.chatroomName]: {
          ...state[action.payload.chatroomName],
          messages: [...action.payload.messages],
        },
      };
    case LOG_OUT:
      log.reducer(action.type, action.payload);
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
