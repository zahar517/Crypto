import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure,
  logout,
  regRequest,
  regSuccess,
  regFailure
} from '../actions/auth';

const isLoginFetching = handleActions(
  {
    [loginRequest]: () => true,
    [loginSuccess]: () => false,
    [loginFailure]: () => false
  },
  false
);

const loginError = handleActions(
  {
    [loginRequest]: () => null,
    [loginFailure]: (state, action) => action.payload
  },
  null
);

const isRegFetching = handleActions(
  {
    [regRequest]: () => true,
    [regSuccess]: () => false,
    [regFailure]: () => false
  },
  false
);

const regError = handleActions(
  {
    [regRequest]: () => null,
    [regFailure]: (state, action) => action.payload
  },
  null
);

const isAuthorized = handleActions(
  {
    [loginSuccess]: () => true,
    [regSuccess]: () => true,
    [logout]: () => false
  },
  false
);

export const getIsLoginFetching = state => state.auth.isLoginFetching;
export const getLoginError = state => state.auth.loginError;
export const getIsRegFetching = state => state.auth.isRegFetching;
export const getRegError = state => state.auth.regError;
export const getIsAuthorized = state => state.auth.isAuthorized;

export default combineReducers({
  isLoginFetching,
  loginError,
  isRegFetching,
  regError,
  isAuthorized
});
