import { USER_EMAIL, SAVE_CURRENCIES } from './actionTypes';
import { fetchCurrencies } from '../../services';

export const getEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const saveCurrecies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const fetchCurrenciesAction = () => async (dispatch) => {
  const getCurrencies = await fetchCurrencies();
  // console.log(Object.keys(getCurrencies));
  const currencieskeys = Object.keys(getCurrencies);
  dispatch(saveCurrecies(currencieskeys));
};
