import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleDeleteClick = ({ target: { id } }) => {
    const { expensesGlobal, dispatch } = this.props;
    console.log('ID EXCLUIR:', id);

    const filteredExpensesGlobal = expensesGlobal
      .filter((expense) => expense.id !== Number(id));
    console.log(filteredExpensesGlobal);

    dispatch(deleteExpense(filteredExpensesGlobal));
  };

  handleEditClick = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expensesGlobal } = this.props;
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
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    name="editBtn"
                    id={ id }
                    onClick={ this.handleEditClick }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    name="deleteBtn"
                    id={ id }
                    onClick={ this.handleDeleteClick }
                  >
                    Excluir
                  </button>
                </td>
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
