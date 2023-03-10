import {
  SAVE_CURRENCIES,
  SAVE_PRICE_QUOTES,
  SAVE_TOTAL_EXPENSES,
} from '../actions/actionTypes';

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
  case SAVE_PRICE_QUOTES:
    return {
      ...state,
      expenses: [...state.expenses, actions.payload],
    };
  case SAVE_TOTAL_EXPENSES:
    return {
      ...state,
      totalExpense: actions.payload,
    };
  default: return state;
  }
};

export default wallet;
