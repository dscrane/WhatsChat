import {
  CHECK_AUTH,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER,
  SET_CHATROOM,
  SET_SOCKET,
} from "../types";
import { log } from "../../utils/log";

// Do not modify
const INITIAL_STATE = {
  isLoggedIn: false,
  _id: null,
  token: null,
  currentChatroom: "Buddies",
  data: {},
  socket: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    case LOG_IN:
      return {
        ...state,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case UPDATE_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case SET_CHATROOM:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};
