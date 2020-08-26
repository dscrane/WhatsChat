export default (state={}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SIGN_UP':

    case 'LOG_IN':
      return {
        ...state,
        userState: {
          [action.payload.user.username]: { ...action.payload }
        }
      }
    default:
      return state
  }
}