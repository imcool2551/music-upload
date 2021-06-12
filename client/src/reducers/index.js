import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import songReducer from './songReducer';

export default combineReducers({
  auth: authReducer,
  songs: songReducer,
  form: formReducer,
});
