import _ from 'lodash'

const INITIAL_STATE = {};

export default (state = {}, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'ADD_CHATROOM':
      return {
        ...state,
        [action._id]: {
          name: action.name,
          _id: action._id,
          messages: {}
        }
      }
    case 'DISPLAY_CHATROOMS':
      console.log(action.payload)
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id')
      }
    default:
      return state
  }
}