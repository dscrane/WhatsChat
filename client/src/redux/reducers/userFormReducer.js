export default (state={}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SIGN_UP':

    case 'LOG_IN':
      console.log('state:', state)
      console.log('action:', action)
      return {
        ...state,
        ...action.payload
      }
    case 'FETCH_USER':
      console.log('FETCH_USER:'
        `[state]: ${state}`
        `[action:] ${action}`,
      )
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}