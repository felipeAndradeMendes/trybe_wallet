import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  // convertValue = (value, currency, exchangeRates) => {
  //   // const { value, currency, exchangeRates } = this.props;
  //   const valor = value * exchangeRates[currency];
  //   return valor;
  // };

  render() {
    const { expensesGlobal } = this.props;
    // console.log(expensesGlobal);
    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido;</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir.</th>
            </tr>
          </thead>
          <tbody>
            {expensesGlobal.map(({
              description,
              tag,
              method,
              value,
              currency,
              id,
              exchangeRates,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number((exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                {/* <td>{ Number((exchangeRates[currency].ask)).toFixed(2) }</td> */}
                <td>Real</td>
                <td>Editar</td>

              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesGlobal: state.wallet.expenses,
});

Table.propTypes = {
  expensesGlobal: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
