import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: 0,
    currencies: 'USD',
    description: '',
    paymentMethod: 'dinheiro',
    tag: 'alimentacao',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAction());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleclick = () => {
    console.log('cliquei');
  };

  render() {
    const { valor, currencies, description, paymentMethod, tag } = this.state;
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

        <label htmlFor="currencies">
          Moeda:
          <select
            id="currencies"
            name="currencies"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currencies }
          >
            {currenciesNames.map((cur) => (
              <option key={ cur } value={ cur }>{ cur }</option>
            ))}
            ;
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de Pagamento
          <select
            id="paymentMethod"
            name="paymentMethod"
            data-testid="method-input"
            value={ paymentMethod }
            onChange={ this.handleChange }
          >
            <option key="dinheiro" value="dinheiro">Dinheiro</option>
            <option key="cartaoDebito" value="cartaoDebito">Cartão de débito</option>
            <option key="cartaoCredito" value="cartaoCredito">Cartão de crédito</option>
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
            <option key="alimentacao" value="alimentacao">Alimentação</option>
            <option key="lazer" value="lazer">Lazer</option>
            <option key="trabalho" value="trabalho">Trabalho</option>
            <option key="transporte" value="transporte">Transporte</option>
            <option key="saude" value="saude">Saúde</option>
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
});

WalletForm.propTypes = {
  currenciesNames: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
