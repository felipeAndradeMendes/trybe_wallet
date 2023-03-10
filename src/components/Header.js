import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    // totalExpenses: ,
    currency: 'BRL',
  };

  // componentDidUpdate() {
  //   this.sumExpenses();
  // }

  // sumExpenses = () => {
  //   const { expenses } = this.props;

  //   const mapExpenses = expenses.map(({ valor, currency, exchangeRates }) => (
  //     (valor * exchangeRates[currency].ask).toFixed(2)
  //   ));
  //   const totalSum = mapExpenses.reduce((cur, acc) => Number(cur) + Number(acc));
  //   console.log('SOMA', totalSum);
  // };

  render() {
    const { userEmail, totalExpensesGlobal } = this.props;
    const { currency } = this.state;
    return (
      <>
        <div>Header</div>
        <p data-testid="email-field">
          Email:
          { ` ${userEmail}` }
        </p>

        <p data-testid="total-field">
          { `${totalExpensesGlobal || 0}` }
        </p>

        <p data-testid="header-currency-field">
          { ` ${currency}` }
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  totalExpensesGlobal: state.wallet.totalExpense,
});

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
