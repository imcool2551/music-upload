import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_CURRENT_USER,
  CHANGE_PASSWORD,
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  nickname: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, isLoggedIn: true, nickname: action.payload };
    case SIGN_IN:
      return { ...state, isLoggedIn: true, nickname: action.payload };
    case SIGN_UP:
      return { ...state, isLoggedIn: true, nickname: action.payload };
    case SIGN_OUT:
      return { ...state, isLoggedIn: false, nickname: null };
    case CHANGE_PASSWORD:
      return { ...state, isLoggedIn: false, nickname: null };
    default:
      return state;
  }
};
