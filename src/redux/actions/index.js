import {
  USER_EMAIL,
  SAVE_CURRENCIES,
  SAVE_PRICE_QUOTES,
  SAVE_TOTAL_EXPENSES,
  DELETE_EXPENSE,
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
