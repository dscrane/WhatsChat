import {
  CHECK_AUTH,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER
} from '../types'

// Do not modify
const INITIAL_STATE = {
  isLoggedIn: false,
  _id: null,
  token: null,
  data: {}
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      console.log('[CHECK_AUTH]:', action)
      return {
        ...state,
        ...action.payload
      };
    case LOG_IN:
      console.log('[LOG_IN]:', action)
      return {
        ...state,
        ...action.payload
      };
    case LOG_OUT:
      console.log('[LOG_OUT]:', action);
      return {
        ...state,
        ...INITIAL_STATE
      };
    case UPDATE_USER:
      console.log('[UPDATE_USER]:', action);
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    default:
      return state;
  }
}