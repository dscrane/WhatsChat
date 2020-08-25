export default (state={}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        [action.payload.username]: action.payload
      }
    default:
      return state;
  }
}