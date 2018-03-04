import React from 'react';
import styled from 'styled-components';
import logo from './Logo-white.svg';
import PropTypes from 'prop-types';

const Logo = styled.div`
  width: ${ props => props.width || '10rem' };
  img {
    display: block;
  }
`;

const LogoComponent = props => (
  <Logo { ...props }>
    <img src={ logo } alt="logo" />
  </Logo>
);

LogoComponent.propTypes = {
  width: PropTypes.string
};

export default LogoComponent;
