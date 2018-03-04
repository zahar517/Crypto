import styled from 'styled-components';

const Button = styled.button`
  background-color: #ddd;
  border: 1px solid transparent;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  outline: none;
  transition: all 0.5s ease;
  &:hover,
  &:focus {
    background-color: #fff;
  }
`;

export default Button;
