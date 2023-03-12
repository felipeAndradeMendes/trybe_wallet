import {
  USER_EMAIL,
  SAVE_CURRENCIES,
  SAVE_PRICE_QUOTES,
  SAVE_TOTAL_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from './actionTypes';
import { fetchCurrencies } from '../../services';

// SYNC //
export const getEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const saveCurrecies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const savePriceQuotes = (currencies) => ({
  type: SAVE_PRICE_QUOTES,
  payload: currencies,
});

export const saveTotalExpenses = (totalExp) => ({
  type: SAVE_TOTAL_EXPENSES,
  payload: totalExp,
});

export const deleteExpense = (updatedExp) => ({
  type: DELETE_EXPENSE,
  payload: updatedExp,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditedExpense = (newExpenses) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: newExpenses,
});

// //////// //
// ASYNC ///

export const fetchCurrenciesAction = () => async (dispatch) => {
  const getCurrencies = await fetchCurrencies();
  const currencieskeys = Object.keys(getCurrencies);
  dispatch(saveCurrecies(currencieskeys));
};

export const fetchPriceQuote = (obj) => async (dispatch) => {
  const getCurrencies = await fetchCurrencies();
  const objCurrencies = { ...getCurrencies };
  const newObj = {
    ...obj,
    exchangeRates: objCurrencies,
  };
  // CONFERIR SE ESSE FORMATO DE OBJETO ACIMA INTERFERE NOS TESTES
  // SE SIM, USAR SOMENTE 'GETCURRENCIES' COMO VALOR DE 'EXCHANGERATES'

  dispatch(savePriceQuotes(newObj));
};

// Função semelhante à acima, mas direcionado especificamente para tratar expense editada;
export const fetchPriceQuoteToEditedExpense = (obj, id, expenses) => async (dispatch) => {
  // Fetch nas currencies e spread na constante para adicionar ao obj;
  const getCurrencies = await fetchCurrencies();
  const objCurrencies = { ...getCurrencies };

  // Traz o elemento/expense a ser editado;
  const foundExpense = expenses.find((expense) => expense.id === Number(id));
  // console.log('FOUND EXPENSE:', foundExpense);

  // Traz a posição do elemento editado no array expenses;
  const index = expenses.indexOf(foundExpense);
  // console.log('INDEX:', index);

  // Cria obj editado com adição da currency atualizada no momento da edição;
  const newObjEdited = {
    ...obj,
    exchangeRates: objCurrencies,
  };
  // console.log('NEW OBJ EDITED', newObjEdited);

  // Substitui o array expenses não editado, pelo novo já com o elemento editado na posição certa;
  expenses[index] = newObjEdited;
  // console.log('EXPENSES', expenses);

  // Chama a action que substituirá o array inteiro pelo editado;
  dispatch(saveEditedExpense(expenses));
};
