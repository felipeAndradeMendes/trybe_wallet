import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    totalExpenses: 0,
    currency: 'BRL',
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
});

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
