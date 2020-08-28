export default (state={
  isLoggedIn: false,
  attributes: {}
}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'CHECK_AUTH':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        token: action.payload.token
      }

    case 'LOG_IN':
      console.log('state:', state)
      console.log('action:', action)
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }

    case 'FETCH_USER':
      console.log('FETCH_USER:')
      console.log(`[state]:`, state)
      console.log(`[action:]`, action)
      return {
        ...state,
         ...action.payload
      }
    default:
      return state
  }
}