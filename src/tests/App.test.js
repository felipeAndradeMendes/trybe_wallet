import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const validEmail = 'felipe@gmail.com';

describe('Testa página de login', () => {
  test('Está presente o input de senha e de email', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test('É possivel escrever nos inputs de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailTest = 'testando_input_de_email';
    const senhaTest = '123456';

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);

    userEvent.type(inputEmail, emailTest);
    expect(inputEmail.value).toBe('testando_input_de_email');

    userEvent.type(inputSenha, senhaTest);
    expect(inputSenha.value).toBe('123456');
  });

  test('O botão entrar é renderizado e está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const btnEntrar = screen.getByRole('button');
    expect(btnEntrar).toBeDisabled();
  });

  test('O botão só é habilitado qd as condições dos inouts são alcançadas', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const btnEntrar = screen.getByRole('button');

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, '123456');

    expect(btnEntrar).toBeEnabled();
  });

  test('O botão continua desabiltiado se um dos inputs não atender às condições', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const btnEntrar = screen.getByRole('button');

    userEvent.type(inputEmail, 'felipe@gmail.c');
    userEvent.type(inputSenha, '12345');

    expect(btnEntrar).toBeDisabled();
  });

  test('Ao clicar no botão, leva a rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const btnEntrar = screen.getByRole('button');

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, '123456');
    expect(btnEntrar).toBeEnabled();

    userEvent.click(btnEntrar);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testa componente Header', () => {
  test('O Header é renderizado com o email logado, total 0 e moeda BRL', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);
    const btnEntrar = screen.getByRole('button');

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, '123456');
    expect(btnEntrar).toBeEnabled();

    userEvent.click(btnEntrar);

    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByText(/Email: felipe@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(0)).toBeInTheDocument();
    expect(screen.getByText('BRL')).toBeInTheDocument();
  });
});

describe('Testa component WalletForm', () => {
  test('Renderiza todos os components do formulario', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    expect(history.location.pathname).toBe('/carteira');

    const valorInput = screen.getByLabelText('Valor:');
    const descricaoInput = screen.getByLabelText('Descrição:');
    const moedaInput = screen.getByLabelText('Moeda:');
    const methodInput = screen.getByLabelText('Método de Pagamento');
    const categoriaInput = screen.getByLabelText('Categoria:');
    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(valorInput).toBeInTheDocument();
    expect(descricaoInput).toBeInTheDocument();
    expect(moedaInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(categoriaInput).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
  });

  test('Os valores preenchidos são enviados para o a tabela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });
    expect(history.location.pathname).toBe('/carteira');

    const valorInput = screen.getByLabelText('Valor:');
    // const descricaoInput = screen.getByLabelText('Descrição:');
    const descricaoInput = screen.getByRole('textbox', { name: /descrição:/i });

    userEvent.type(valorInput, '100');
    userEvent.type(descricaoInput, 'gasto 01');

    const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(btnAdd);

    // screen.logTestingPlaygroundURL();
    expect(await screen.findByText(/gasto 01/i)).toBeInTheDocument();
    expect(await screen.findByText('100.00')).toBeInTheDocument();
  });
});

// userEvent.selectOptions(
//   screen.getByTestId('currency-input'),
//   screen.getByRole('option', { name: 'CAD' }),
// );
// userEvent.click(moedaInput);
// userEvent.selectOptions(moedaInput, screen.getByRole('option', { name: 'EUR' }));
// expect(screen.getByRole('option', { name: 'EUR' }).selected).toBeTruthy();
// TENTANDO SELECIONAR A OPÇÃO DO SELECT, MAS SE NAÕ CONSEGUIR LOGO, DEIXA COMO ESTÁ NO PADRÃO
