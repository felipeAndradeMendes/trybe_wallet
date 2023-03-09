import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAction());
  }

  ///

  // componentDidMount() {
  //   this.fetchCurrencies();
  // }

  // fetchCurrencies = async () => {
  //   const curEndPoint = 'https://economia.awesomeapi.com.br/json/all';
  //   const results = await fetch(curEndPoint);
  //   const data = await results.json();

  //   delete data.USDT;
  //   console.log(data);
  //   return data;
  // };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valor } = this.state;
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
            onChange={ this.handleChange }
            value={ valor }
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="descreva o gasto"
          />
        </label>

        <label htmlFor="currencies">
          Moeda:
          <select id="currencies" name="currencies" data-testid="currency-input">
            {currenciesNames.map((cur) => (
              <option key={ cur } value="cur">{ cur }</option>
            ))}
            ;
          </select>
        </label>

        <label htmlFor="paymentMethod">
          Método de Pagamento
          <select id="paymentMethod" name="paymentMethod" data-testid="method-input">
            <option key="dinheiro" value="dinheiro">Dinheiro</option>
            <option key="cartaoDebito" value="cartaoDebito">Cartão de débito</option>
            <option key="cartaoCredito" value="cartaoCredito">Cartão de crédito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Método de Pagamento
          <select id="tag" name="tag" data-testid="tag-input">
            <option key="alimentacao" value="alimentacao">Alimentação</option>
            <option key="lazer" value="lazer">Lazer</option>
            <option key="trabalho" value="trabalho">Trabalho</option>
            <option key="transporte" value="transporte">Transporte</option>
            <option key="saude" value="saude">Saúde</option>
          </select>
        </label>

      </>
    );
  }
}
// TERMINEI O DIA NESSE COMPONENTE
// LEMBRAR DE ATRIBUIR OS VALORES AO STATE LOCAL
// ATENÇÃO AOS INPUTS SELECT PARA COMO ESTÃO DEFAULT NO ESTATE
const mapStateToProps = (state) => ({
  currenciesNames: state.wallet.currencies,
});

WalletForm.propTypes = {
  currenciesNames: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
