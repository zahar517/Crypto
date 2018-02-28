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

    expect(state1.isLoading).toBe(true);
    expect(state2.isLoading).toBe(false);
    expect(state3.isLoading).toBe(false);
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
    const isLoading = true;
    const info = { info: 'some info' };
    const error = { error: 'some error' };
    const state = {
      user: { ...initialState, isLoading, info, error }
    }

    expect(getUserInfoIsLoading(state)).toBe(true);
    expect(getUserInfo(state)).toBe(info);
    expect(getUserInfoError(state)).toBe(error);
  });
});
