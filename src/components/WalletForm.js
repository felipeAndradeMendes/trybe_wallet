import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction,
  fetchPriceQuote,
  saveTotalExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    valor: 0,
    currency: 'USD',
    description: '',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAction());
  }

  componentDidUpdate(prevProps) {
    const { dispatch, expenses } = this.props;
    // const { id, valor, description, currency, method, tag } = this.state;
    console.log('EXPENSES LENGTH', expenses.length);
    // if (prevState.id !== this.state.id) {
    if (prevProps.expenses.length !== expenses.length) {
      // const expenseObj = {
      //   id,
      //   value: valor,
      //   currency,
      //   description,
      //   method,
      //   tag,
      //   exchangeRates: {},
      // };

      // dispatch(fetchPriceQuote(expenseObj));

      const totalExpenses = this.sumExpenses();
      dispatch(saveTotalExpenses(totalExpenses));
      console.log('atualizou!');
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleclick = () => {
    console.log('cliquei');

    const { id, valor, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;

    const expenseObj = {
      id,
      value: valor,
      currency,
      description,
      method,
      tag,
      exchangeRates: {},
    };

    dispatch(fetchPriceQuote(expenseObj));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      valor: '',
      description: '',
    }));
    // const sec = 1000;
    // dispatch(fetchPriceQuote(expenseObj));
    // setTimeout(() => {
    //   const totalExpenses = this.sumExpenses();
    //   dispatch(saveTotalExpenses(totalExpenses));
    // }, sec);
  };

  sumExpenses = () => {
    const { expenses } = this.props;
    const mapExpenses = expenses.map(({ value, currency, exchangeRates }) => (
      (value * exchangeRates[currency].ask).toFixed(2)
    ));
    const totalSum = mapExpenses.reduce((cur, acc) => Number(cur) + Number(acc), 0);

    // console.log('SOMA', totalSum);
    return (totalSum).toFixed(2);
  };

  render() {
    const { valor, currency, description, method, tag } = this.state;
    const { currenciesNames } = this.props;
    // console.log(currenciesNames);
    return (
      <>
        <div>WalletForm</div>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            name="valor"
            id="valor"
            value={ valor }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            placeholder="descreva o gasto"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currenciesNames.map((cur) => (
              <option key={ cur } value={ cur }>{ cur }</option>
            ))}
            ;
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option key="dinheiro" value="Dinheiro">Dinheiro</option>
            <option key="cartaoDebito" value="Cartão de débito">Cartão de débito</option>
            <option
              key="cartaoCredito"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option key="alimentacao" value="Alimentação">Alimentação</option>
            <option key="lazer" value="Lazer">Lazer</option>
            <option key="trabalho" value="Trabalho">Trabalho</option>
            <option key="transporte" value="Transporte">Transporte</option>
            <option key="saude" value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          name="adicionarDespesa"
          onClick={ this.handleclick }
        >
          Adicionar despesa
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesNames: state.wallet.currencies,
  walletState: state.wallet,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currenciesNames: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
