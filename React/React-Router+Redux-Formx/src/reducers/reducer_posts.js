import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function (state={}, actions) {
  switch (actions.type) {
    case DELETE_POST:
      return _.omit(state, actions.payload);
    case FETCH_POST:
      return { ... state, [actions.payload.data.id]:actions.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(actions.payload.data, 'id');
    default:
      return state;
  }
}