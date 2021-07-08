import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from '../constants/index';
const initialState = { currentUser: null, posts: [], following: [] };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_STATE_CHANGE:
      return { ...state, currentUser: payload.currentUser };
    case USER_POSTS_STATE_CHANGE:
      return { ...state, posts: payload.posts };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: payload.following,
      };
    default:
      return state;
  }
};
