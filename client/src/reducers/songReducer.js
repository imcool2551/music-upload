import _ from 'lodash';
import { CREATE_ALBUM, FETCH_SONGS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return [...action.payload];
    case CREATE_ALBUM:
      return state;
    default:
      return state;
  }
};
