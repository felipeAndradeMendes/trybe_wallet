import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import { fetchCurrencies } from '../services';
import mockData from './helpers/mockData';

describe('Testa o formulário de despesas', () => {
  const expense01 = [{
    id: 0,
    value: 15,
    currency: 'USD',
    description: 'gasto 01',
    method: 'dinheiro',
    tag: 'alimentacao',
    exchangeRates: mockData,
  }];
  const currenciesArray = Object.keys(mockData);

  const initialState = {
    wallet: {
      currencies: currenciesArray,
      expenses: expense01,
    },
  };

  const initialEntries = ['/carteira'];

  // beforeEach(() => {
  //   global.fetch = jest.fn(fetchCurrencies);
  // });
  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

  test('Verifica se os campos foram renderizados', () => {
    // global.fetch = jest.fn(fetchCurrencies);

    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    // const currencyEndPoint = 'https://economia.awesomeapi.com.br/json/all';

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');

    // expect(global.fetch).toHaveBeenCalled();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
  });
});
