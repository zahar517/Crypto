import React, { PureComponent } from 'react';
import Logo from '../AppHeader/Logo-white.svg';
import './AppFooter.css';

export class AppFooter extends PureComponent {
  render() {
    return (
      <div className="footer">
        <p>Сделано с любовью и старанием<br />
        на курсе "React.js" в Loftschool.<br />
        Автор работы: <b>Захаров Дмитрий</b>.</p>
        <div className="header__logo">
          <img src={ Logo } alt="logo" />
        </div>
      </div>
    );
  }
}

export default AppFooter;