import {
  SAVE_CURRENCIES,
  SAVE_PRICE_QUOTES,
  SAVE_TOTAL_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, actions) => {
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: actions.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: actions.payload,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: [...actions.payload],
    };
  default: return state;
  }
};

export default wallet;
