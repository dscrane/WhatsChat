import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

// import userFormReducer from './userFormReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  // userState: userFormReducer,
  form: formReducer
});