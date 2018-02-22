import authReducer from '../auth';
import { combineReducers } from 'redux';
import {
  getIsLoginFetching,
  getLoginError,
  getIsRegFetching,
  getRegError,
  getIsAuthorized
} from '../auth';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  regRequest,
  regSuccess,
  regFailure,
  logout,
} from '../../actions/auth';

describe('Reducer auth tests', () => {
  let initialAuthState;

  beforeEach(() => {
    initialAuthState = {
      isAuthorized: false,
      isLoginFetching: false,
      isRegFetching: false,
      loginError: null,
      regError: null
    }
  });

  it('Test initial state', () => {
    const state = authReducer(undefined, { type: 'TEST_ACTION'});

    expect(initialAuthState).toEqual(state);
  });

  it('changes isLoginFetching flag', () => {
    const state1 = authReducer(initialAuthState, loginRequest());
    const state2 = authReducer(state1, loginSuccess());
    const state3 = authReducer(state1, loginFailure(null));

    expect(state1.isLoginFetching).toBeTruthy();
    expect(state2.isLoginFetching).toBeFalsy();
    expect(state3.isLoginFetching).toBeFalsy();
  });

  it('clear loginError if loginRequest', () => {
    const state1 = { ...initialAuthState, loginError: { error: 'some error' }};
    const state2 = authReducer(state1, loginRequest());

    expect(state2.loginError).toBeNull();
  });

  it('fill loginError if loginFailure', () => {
    const testError = { error: 'some error' };
    const state1 = authReducer(initialAuthState, loginFailure(testError));

    expect(state1.loginError).toEqual(testError);
  });

  it('changes isRegFetching flag', () => {
    const state1 = authReducer(initialAuthState, regRequest());
    const state2 = authReducer(state1, regSuccess());
    const state3 = authReducer(state1, regFailure(null));

    expect(state1.isRegFetching).toBeTruthy();
    expect(state2.isRegFetching).toBeFalsy();
    expect(state3.isRegFetching).toBeFalsy();
  });

  it('clear regError if regRequest', () => {
    const state1 = { ...initialAuthState, regError: { error: 'some error' }};
    const state2 = authReducer(state1, regRequest());

    expect(state2.regError).toBeNull();
  });

  it('fill regError if regFailure', () => {
    const testError = { error: 'some error' };
    const state1 = authReducer(initialAuthState, regFailure(testError));

    expect(state1.regError).toEqual(testError);
  });

  it('changes isAuthorized flag', () => {
    const state1 = authReducer(initialAuthState, loginSuccess());
    const state2 = authReducer(initialAuthState, regSuccess());
    const state3 = authReducer(state1, logout());

    expect(state1.isAuthorized).toBeTruthy();
    expect(state2.isAuthorized).toBeTruthy()
    expect(state3.isAuthorized).toBeFalsy();
  });

  it('selectors returns wright values', () => {
    const state = combineReducers(
      { auth: authReducer }
    )(undefined, { type: 'TEST_ACTION' });

    expect(getIsLoginFetching(state)).toBeFalsy();
    expect(getLoginError(state)).toBeFalsy();
    expect(getIsRegFetching(state)).toBeFalsy();
    expect(getRegError(state)).toBeFalsy();
    expect(getIsAuthorized(state)).toBeFalsy();
  })
})
