import React, { PureComponent} from 'react';
import Particles from 'react-particles-js';
import params from './particles-params';
import './LoginPage.css';
import Logo from './Logo.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginRequest, regRequest } from '../../actions/auth';
import { 
  getIsLoginFetching, 
  getIsRegFetching,
  getLoginError,
  getRegError
} from '../../reducers/auth';

export class LoginPage extends PureComponent {
  static propTypes = {
    isLoginLoading: PropTypes.bool.isRequired,
    isRegLoading: PropTypes.bool.isRequired,
    loginError: PropTypes.object,
    regError: PropTypes.object,
    loginRequest: PropTypes.func.isRequired,
    regRequest: PropTypes.func.isRequired
  }

  static defaultProps = {
    loginError: null,
    regError: null,
    isLoginLoading: false,
    isRegLoading: false,    
    loginRequest: () => null,
    regRequest: () => null
  }

  state = {
    isLogin: true,
    email: '',
    password: ''
  }

  handleSubmit = event => {
    event.preventDefault();
    let { email, password } = this.state;

    email = email.trim();
    password = password.trim();

    if (!email || !password) return;

    if (this.state.isLogin) {
      this.props.loginRequest({ email, password });
    } else {
      this.props.regRequest({ email, password });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    const { isLogin, email, password } = this.state;
    const { isLoginLoading, isRegLoading, loginError, regError } = this.props;

    return (
      <main>
        <div className="login">
          <div className="login__container">
            <div className="login__logo">
              <img src={ Logo } alt="logo" />
            </div>
            <form className="login__form" onSubmit={ this.handleSubmit } >
              <div className="login__email">
                <label htmlFor="email" />
                <input 
                  id="email"
                  value={ email } 
                  name="email" 
                  onChange={ this.handleChange } 
                  placeholder="email"
                  autoFocus
                />
              </div>
              <div className="login__password">
                <label htmlFor="password" />
                <input 
                  id="password"
                  value={ password } 
                  name="password" 
                  type="password" 
                  onChange={ this.handleChange } 
                  placeholder="password"
                />
              </div>
              { (isLoginLoading || isRegLoading) && <p className="spinner">Подождите ...</p>}
              { (isLogin && loginError) && <p className="login__error">{ loginError.message }</p> }
              { (!isLogin && regError) && <p className="login__error">{ regError.message.email }</p> }
              <button type="submit">{ isLogin ? 'Войти' : 'Зарегистрироваться' }</button>
            </form>
            <div className="login__footer">
              { isLogin ? 'Впервые на сайте? ' : 'Уже зарегистрированы? ' }
              <a href="" onClick={ this.handleClick }>
                { isLogin ? 'Регистрация' : 'Войти' }
              </a>
            </div>
          </div>
        </div>
        <Particles params={ params } />
      </main>
    );
  }
}

export default connect(
  state => ({
    isLoginLoading: getIsLoginFetching(state),
    isRegLoading: getIsRegFetching(state),
    loginError: getLoginError(state),
    regError: getRegError(state)
  }),
  {
    loginRequest,
    regRequest
  }
)(LoginPage);
