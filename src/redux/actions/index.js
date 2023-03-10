import { USER_EMAIL, SAVE_CURRENCIES, SAVE_PRICE_QUOTES } from './actionTypes';
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

// ////////// //
// ASYNC ///

export const fetchCurrenciesAction = () => async (dispatch) => {
  const getCurrencies = await fetchCurrencies();
  // console.log(Object.keys(getCurrencies));
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
  // console.log('DESPESAS E COTAÇÃO:', newObj);
  dispatch(savePriceQuotes(newObj));
};
