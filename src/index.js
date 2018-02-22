import { render } from 'react-dom';
import React from 'react';
import LoginPage from './components/LoginPage';
import './index.css';
import createStore from './store';
import { Provider } from 'react-redux';

const store = createStore();

render(
  <Provider store={ store } >
    <LoginPage />
  </Provider>,
  document.getElementById('root')
);
