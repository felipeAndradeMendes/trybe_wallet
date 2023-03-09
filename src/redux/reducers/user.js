import { USER_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: actions.payload,
    };
  default: return state;
  }
};

export default user;
