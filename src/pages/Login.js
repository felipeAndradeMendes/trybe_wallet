import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailLogin: '',
    passWordLogin: '',
    isDisabled: true,
  };

  validateInputs = () => {
    const {
      passWordLogin,
      emailLogin,
    } = this.state;
    const minLength = 6;
    // const emailRegex = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    // let regex = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i')
    // const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const validPassword = passWordLogin.length >= minLength;
    const validEmail = emailRegex.test(emailLogin);

    return !(validPassword && validEmail);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isDisabled: this.validateInputs(),
      });
    });
  };

  handleclick = () => {
    const { dispatch } = this.props;
    const { emailLogin } = this.state;
    const { history } = this.props;

    dispatch(getEmail(emailLogin));
    history.push('/carteira');
  };

  render() {
    const {
      isDisabled,
    } = this.state;
    return (
      <>
        <input
          type="email"
          name="emailLogin"
          placeholder="Email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />

        <input
          type="text"
          name="passWordLogin"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          name="entrar"
          // value="Entrar"
          onClick={ this.handleclick }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    history: PropTypes.string,
  }),
}.isRequired;

export default connect()(Login);
