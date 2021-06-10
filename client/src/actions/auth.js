import { SubmissionError } from 'redux-form';
import api from '../apis/api';
import history from '../history';
import { SIGN_IN, SIGN_OUT, SIGN_UP, GET_CURRENT_USER } from './types';

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/auth/user');
    dispatch({ type: GET_CURRENT_USER, payload: data.nickname });
  } catch (err) {
    dispatch({ type: SIGN_OUT });
    history.push('/login');
  }
};

export const login =
  ({ userId, password }) =>
  async (dispatch) => {
    try {
      const { data } = await api.post('/api/auth/login', {
        userId,
        password,
      });
      dispatch({ type: SIGN_IN, payload: data.nickname });
      history.push('/');
    } catch (err) {
      throw new SubmissionError({ _error: '로그인 실패' });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await api.get('/api/auth/logout');
  } catch (err) {
  } finally {
    dispatch({ type: SIGN_OUT });
    history.push('/login');
  }
};

export const signup =
  ({ userId, password, nickname }) =>
  async (dispatch) => {
    try {
      const { data } = await api.post('/api/auth/signup', {
        userId,
        password,
        nickname,
      });
      dispatch({ type: SIGN_UP, payload: data.nickname });
      alert(data.message);
      history.push('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };
