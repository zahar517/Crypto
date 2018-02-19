import React, { PureComponent} from 'react';
import Particles from 'react-particles-js';
import params from './particles-params';
import './LoginPage.css';
import Logo from './Logo.svg';
import PropTypes from 'prop-types';

export class LoginPage extends PureComponent {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    registrationRequest: PropTypes.func.isRequired
  }

  static defaultProps = {
    loginRequest: (email, password) => { console.log(email, password) },
    registrationRequest: (email, password) => { console.log(email, password) }
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
      this.props.loginRequest(email, password);
    } else {
      this.props.registrationRequest(email, password);
    }

    this.setState({ email: '', password: '' });
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

export default LoginPage;
