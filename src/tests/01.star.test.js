import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o Componente/Pagina Login', () => {
  const INVALID_EMAIL_1 = 'felipeemail@';
  const INVALID_EMAIL_2 = 'felipe';
  const INVALID_EMAIL_3 = 'felipe@com@';
  const INVALID_EMAIL_4 = 'felipe@com.';
  const INVALID_PASSWORD = '12';
  const VALID_EMAIL = 'felipe@gmail.com';
  const VALID_PASSWORD = '123456';
  const inputPasswordTestid = 'password-input';
  const emailInputTestId = 'email-input';

  test('A rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('São renderizados campos para email e senha e um botão', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(emailInputTestId)).toBeVisible();
    expect(screen.getByTestId(inputPasswordTestid)).toBeVisible();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('As condições de email, senha e botão foram satisfeitas', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(inputPasswordTestid);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    // Email errado 1 e Senha correta
    // userEvent.clear(emailInput);
    // userEvent.clear(passwordInput);
    userEvent.type(emailInput, INVALID_EMAIL_1);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();

    // Email errado 2 e Senha correta
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, INVALID_EMAIL_2);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();

    // Email errado 3 e Senha correta
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, INVALID_EMAIL_3);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();

    // Email errado 4 e Senha correta
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, INVALID_EMAIL_4);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();

    // Dois inputs errados
    userEvent.type(emailInput, INVALID_EMAIL_1);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();
    // expect(emailInput.value).toBe('felipe@email');
    // expect(passwordInput.value).toBe('12');

    // Email correto e Senha errada
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(btnEntrar).toBeDisabled();
    // console.log(screen.getByTestId(inputPasswordTestid).value);
    // console.log(screen.getByTestId(emailInputTestId).value);

    // Dois inputs corretos
    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(btnEntrar).toBeEnabled();
    // console.log(screen.getByTestId(inputPasswordTestid).value);
    // console.log(screen.getByTestId(emailInputTestId).value);
  });

  test('O email é salvo no estado da aplicação', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(inputPasswordTestid);
    const btnEntrar = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(btnEntrar);

    const { pathname } = history.location;
    expect(await pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });
});
