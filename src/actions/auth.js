import { createActions } from 'redux-actions';

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} = createActions(
  'LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT'
);

export const {
  regRequest,
  regSuccess,
  regFailure
} = createActions(
  'REG_REQUEST', 'REG_SUCCESS', 'REG_FAILURE'
);
