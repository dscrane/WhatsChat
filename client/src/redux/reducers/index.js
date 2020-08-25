import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import userFormReducer from './userFormReducer';

export default combineReducers({
  formState: userFormReducer,
  form: formReducer
});