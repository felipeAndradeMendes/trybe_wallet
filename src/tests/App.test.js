import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

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

  test('Ao clicar no botão, leva a rota /carteira e o email correto apareceno Header', () => {
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
  const btnTextName = 'Adicionar despesa';

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
    const btnAdd = screen.getByRole('button', { name: btnTextName });

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

    const btnAdd = screen.getByRole('button', { name: btnTextName });
    userEvent.click(btnAdd);

    expect(await screen.findByText(/gasto 01/i)).toBeInTheDocument();
    expect(await screen.findByText('100.00')).toBeInTheDocument();
  });
});

describe('Testa component Table', () => {
  const btnTextName = 'Adicionar despesa';

  // const initialEntries = [{
  //   wallet: {
  //     expenses: [{
  //       id: 0,
  //       value: '10',
  //       currency: 'USD',
  //       description: 'gasto 01',
  //       method: 'dinheiro',
  //       tag: 'alimentacao',
  //     }],
  //   },
  // };

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

  test('O botão editar altera o botão adicionar despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    // const { history } = renderWithRouterAndRedux(<App />);
    // act(() => {
    //   history.push('/carteira');
    // });
    expect(screen.getByRole('button', { name: btnTextName })).toBeVisible();

    const valorInput = screen.getByLabelText('Valor:');
    userEvent.type(valorInput, '15');
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
    userEvent.type(descriptionInput, 'Despesa 01');

    expect(screen.getByText('gasto 01')).toBeVisible();
    expect(screen.getByText('15.00')).toBeVisible();

    const btnEditar = screen.getByRole('button', { name: 'Editar' });
    expect(btnEditar).toBeInTheDocument();

    userEvent.click(btnEditar);
    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: btnTextName })).not.toBeInTheDocument();

    // const valorInput2 = screen.getByLabelText('Valor:');

    userEvent.clear(valorInput);
    expect(screen.getByLabelText('Valor:').value).toBe('');
    userEvent.type(valorInput, '10');
    expect(valorInput.value).toBe('10');

    const btnEditarDespesa = screen.getByRole('button', { name: 'Editar despesa' });
    expect(btnEditarDespesa).toBeInTheDocument();

    userEvent.click(btnEditarDespesa);
    screen.logTestingPlaygroundURL();
    expect(valorInput.value).toBe('');
    expect(await screen.findByText('10.00')).toBeVisible();
  });
});

// AINDA COM PROBLEMAS NO RENDERWITHROUTERANDREDUX...

// userEvent.selectOptions(
//   screen.getByTestId('currency-input'),
//   screen.getByRole('option', { name: 'CAD' }),
// );
// userEvent.click(moedaInput);
// userEvent.selectOptions(moedaInput, screen.getByRole('option', { name: 'EUR' }));
// expect(screen.getByRole('option', { name: 'EUR' }).selected).toBeTruthy();
// TENTANDO SELECIONAR A OPÇÃO DO SELECT, MAS SE NAÕ CONSEGUIR LOGO, DEIXA COMO ESTÁ NO PADRÃO
