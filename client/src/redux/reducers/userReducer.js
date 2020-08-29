

export default (state={}, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'FETCH_USER':
      console.log(`[FETCH_USER]:`, action)
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case 'UPDATE_USER':
      console.log('[UPDATE_USER]:', action)
      return {};
    default:
      return state;
  }
}