// Do not modify
const INITIAL_STATE = {
  isLoggedIn: false,
  _id: null,
  token: null
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHECK_AUTH':
      console.log('[CHECK_AUTH]:', action)
      return {
        ...state,
        ...action.payload
      };
    case 'LOG_IN':
      console.log('[LOG_IN]:', action)
      return {
        ...state,
        ...action.payload
      };
    case 'LOG_OUT':
      console.log('[LOG_OUT]:', action);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}