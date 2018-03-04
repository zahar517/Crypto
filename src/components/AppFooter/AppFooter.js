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
  @media (max-width: 720px) {
    flex-flow: column nowrap;
  }
`;

const FooterText = styled.div`
  max-width: 40%;
  margin: 1rem;  
  p {
    margin: 0;
    padding: 0;
    font-size: 0.75rem;
  }
  @media (max-width: 720px) {
    max-width: none;
    text-align: center;
  }
`;

export class AppFooter extends PureComponent {
  render() {
    return (
      <Footer>
        <FooterText>
          <p>
            Сделано с любовью и старанием<br />
            Автор работы: <b>Захаров Дмитрий</b>.
          </p>
        </FooterText>
        <Logo />
      </Footer>
    );
  }
}

export default AppFooter;
