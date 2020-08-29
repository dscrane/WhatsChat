import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
// import userFormReducer from './userFormReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  // userState: userFormReducer,
  form: formReducer
});