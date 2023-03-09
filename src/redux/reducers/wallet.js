import { SAVE_CURRENCIES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, actions) => {
  // console.log('reducer:', actions.payload)
  switch (actions.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: actions.payload,
    };
  default: return state;
  }
};

export default wallet;
