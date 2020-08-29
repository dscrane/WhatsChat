export default (state={
  isLoggedIn: false,
  attributes: {}
}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'CHECK_AUTH':
      return {
        ...state,
        _id: action.payload._id,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token
      }

    case 'LOG_IN':
      console.log('[LOG_IN]:', action)
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }

    case 'FETCH_USER':
      console.log(`[FETCH_USER]:`, action)

      return {
        ...state,
        ...action.payload
      }
    case 'LOG_OUT':
      console.log(`[LOG_OUT]:`, action);
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}