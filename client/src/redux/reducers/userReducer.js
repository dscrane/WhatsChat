// import _ from 'lodash';

export default (state={}, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      console.log('[FETCH_USER]', action)
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case 'UPDATE_USER':
      console.log('[UPDATE_USER]', action)
      return {};
    case 'DELETE_USER':
      console.log('[DELETE_USER]', action)
      return {}
    default:
      return state;
  }
}