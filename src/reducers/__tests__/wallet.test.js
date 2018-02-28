import walletReducer from '../wallet';
import { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure } from '../../actions/wallet';
import { sellCurrencyRequest, buyCurrencyRequest } from '../../actions/currency';
import { combineReducers } from 'redux';
import { getIsLoading, getCoins, getError } from '../wallet';

describe('Wallet reducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      coins: {},
      error: null,
    };
  });

  it('Test initial state', () => {
    const state = walletReducer(undefined, { type: 'TEST_ACTION'});

    expect(state).toEqual(initialState);
  });

  it('change isLoading flag', () => {
    const state1 = walletReducer(initialState, fetchWalletRequest());
    const state2 = walletReducer(state1, fetchWalletSuccess({}));
    const state3 = walletReducer(state1, fetchWalletFailure({}));
    const state4 = walletReducer(initialState, sellCurrencyRequest());
    const state5 = walletReducer(initialState, buyCurrencyRequest());

    expect(state1.isLoading).toBeTruthy();
    expect(state2.isLoading).toBeFalsy();
    expect(state3.isLoading).toBeFalsy();
    expect(state4.isLoading).toBeTruthy();
    expect(state5.isLoading).toBeTruthy();
  });

  it('fill coins if fetchWalletSuccess', () => {
    const testCoins = { coins: 'some coins' };
    const state1 = walletReducer(initialState, fetchWalletSuccess(testCoins));

    expect(state1.coins).toEqual(testCoins);
  });

  it('clear coins if fetchWalletRequest', () => {
    const testState = { ...initialState, coins: 'some coins' };
    const state1 = walletReducer(testState, fetchWalletRequest());

    expect(state1.coins).toEqual(initialState.coins);
  });

  it('fill error if fetchWalletFailure', () => {
    const testError = { error: 'some error' };
    const state1 = walletReducer(initialState, fetchWalletFailure(testError));

    expect(state1.error).toEqual(testError);
  });

  it('clear error if fetchWalletRequest, fetchWalletSuccess, sellCurrencyRequest, buyCurrencyRequest', () => {
    const testState = { ...initialState, error: 'some error' };
    const state1 = walletReducer(testState, fetchWalletRequest());
    const state2 = walletReducer(testState, fetchWalletSuccess({}));
    const state3 = walletReducer(testState, buyCurrencyRequest({}));
    const state4 = walletReducer(testState, sellCurrencyRequest({}));
    
    expect(state1.error).toBeNull();
    expect(state2.error).toBeNull();
    expect(state3.error).toBeNull();
    expect(state4.error).toBeNull();
  });

  it('selectors returns wright values', () => {
    const rootReducer = combineReducers({ wallet: walletReducer });
    const testCoins = { coins: 'some coins' };
    const testError = { error: 'some error' };

    const initialState = rootReducer(undefined, { type: 'TEST_ACTION' });
    const state1 = rootReducer(initialState, fetchWalletRequest());
    const state2 = rootReducer(state1, fetchWalletSuccess(testCoins));
    const state3 = rootReducer(state1, fetchWalletFailure(testError));

    expect(getIsLoading(state1)).toBeTruthy();
    expect(getCoins(state2)).toEqual(testCoins);
    expect(getError(state3)).toEqual(testError);
  });
});
