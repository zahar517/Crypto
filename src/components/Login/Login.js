import React, { PureComponent} from 'react';
import Particles from 'react-particles-js';
import params from './particles-params';
import './Login.css';

export class Login extends PureComponent {
  render() {
    return (
      <main>
        <div className="app__login login">
          <div className="login__logo">Logo</div>
          <div className="login__form">Form</div>
          <div className="login__footer">Footer</div>
        </div>
        <Particles params={ params } />
      </main>
    );
  }
}

export default Login;
