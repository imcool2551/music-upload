import _ from 'lodash';
import { CREATE_ALBUM, FETCH_SONGS, UPDATE_SONG } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return _.mapKeys(action.payload, 'id');
    case CREATE_ALBUM:
      return state;
    case UPDATE_SONG:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
