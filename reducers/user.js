import { USER_STATE_CHANGE } from '../constants/index';
const initialState = { currentUser: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_STATE_CHANGE:
      return { ...state, currentUser: payload.currentUser };
    default:
      return state;
  }
};
