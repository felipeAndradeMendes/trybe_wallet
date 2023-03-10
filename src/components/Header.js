import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    totalExpenses: 0,
    currency: 'BRL',
  };

  componentDidUpdate() {
    this.sumExpenses();
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    console.log('DESPESAS:', expenses);

    const newArr = expenses.map(({ valor, currency, exchangeRates }) => (
      exchangeRates.USD
    ));
    console.log('SOMA:', newArr);

    // console.log(expenses[0].exchangeRates['expenses.currency']);
    // CEHCAR SE FORMATO DO OBJETO ESTÁ CERTO NA CHAVE EXCHANGE RATES
  };

  render() {
    const { userEmail } = this.props;
    const { totalExpenses, currency } = this.state;
    return (
      <>
        <div>Header</div>
        <p data-testid="email-field">
          Email:
          { ` ${userEmail}` }
        </p>

        <p data-testid="total-field">
          Despesa Total:
          { ` ${totalExpenses}` }
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
});

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
