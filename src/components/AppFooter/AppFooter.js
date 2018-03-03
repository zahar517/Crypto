import React, { PureComponent } from 'react';
import Logo from '../Logo';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: #eee;
  p {
    font-size: 0.75rem;
    margin: 1rem;  
  }
`;

export class AppFooter extends PureComponent {
  render() {
    return (
      <Footer>
        <p>Сделано с любовью и старанием<br />
        Автор работы: <b>Захаров Дмитрий</b>.</p>
        <Logo />
      </Footer>
    );
  }
}

export default AppFooter;
