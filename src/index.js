import { render } from 'react-dom';
import React from 'react';
import './index.css';
import createStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

const store = createStore();

render(
  <BrowserRouter>
    <Provider store={ store } >
      <AppRouter />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
