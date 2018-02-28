import userReducer, {
  getUserInfoIsLoading,
  getUserInfo,
  getUserInfoError,
} from '../user';
import { 
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoFailure
} from '../../actions/user';
import { combineReducers } from 'redux';

describe('User reducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      info: null,
      error: null,
    };
  });

  it('test initial state', () => {
    const state = userReducer(undefined, { type: 'TEST_ACTION '});

    expect(state).toEqual(initialState);
  });

  it('change isLoading flag', () => {
    const state1 = userReducer(initialState, fetchUserInfoRequest());
    const state2 = userReducer(state1, fetchUserInfoSuccess({}));
    const state3 = userReducer(state1, fetchUserInfoFailure({}));

    expect(state1.isLoading).toBeTruthy();
    expect(state2.isLoading).toBeFalsy();
    expect(state3.isLoading).toBeFalsy();
  });

  it('fill user info if fetchUserInfoSuccess', () => {
    const testInfo = { info: 'some info' };
    const state1 = userReducer(initialState, fetchUserInfoSuccess(testInfo));

    expect(state1.info).toEqual(testInfo);
  });

  it('clear user info if fetchUserInfoRequest', () => {
    const testState = { ...initialState, info: 'some info' };
    const state1 = userReducer(testState, fetchUserInfoRequest());

    expect(state1.info).toBeNull();
  });

  it('fill error if fetchUserInfoFailure', () => {
    const testError = { error: 'some error' };
    const state1 = userReducer(initialState, fetchUserInfoFailure(testError));

    expect(state1.error).toEqual(testError);
  });

  it('clear user error if fetchUserInfoRequest', () => {
    const testState = { ...initialState, error: 'some error' };
    const state1 = userReducer(testState, fetchUserInfoRequest());

    expect(state1.error).toBeNull();
  });

  it('clear user error if fetchUserInfoSuccess', () => {
    const testState = { ...initialState, error: 'some error' };
    const state1 = userReducer(testState, fetchUserInfoSuccess({}));

    expect(state1.error).toBeNull();
  });

  it('selectors returns wright values', () => {
    const rootReducer = combineReducers({ user: userReducer });
    const testInfo = { info: 'some info' };
    const testError = { error: 'some error' };

    const initialState = rootReducer(undefined, { type: 'TEST_ACTION' });
    const state1 = rootReducer(initialState, fetchUserInfoRequest());
    const state2 = rootReducer(state1, fetchUserInfoSuccess(testInfo));
    const state3 = rootReducer(state1, fetchUserInfoFailure(testError));

    expect(getUserInfoIsLoading(state1)).toBeTruthy();
    expect(getUserInfo(state2)).toEqual(testInfo);
    expect(getUserInfoError(state3)).toEqual(testError);
  });
});
