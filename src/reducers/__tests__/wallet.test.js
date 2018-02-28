import walletReducer from '../wallet';
import { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure } from '../../actions/wallet';
import { sellCurrencyRequest, buyCurrencyRequest } from '../../actions/currency';
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

    expect(state1.isLoading).toBe(true);
    expect(state2.isLoading).toBe(false);
    expect(state3.isLoading).toBe(false);
    expect(state4.isLoading).toBe(true);
    expect(state5.isLoading).toBe(true);
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
    const isLoading = true;
    const coins = { coins: 'some coins' };
    const error = { error: 'some error' };
    const state = {
      wallet: { ...initialState, isLoading, coins, error }
    }

    expect(getIsLoading(state)).toBe(true);
    expect(getCoins(state)).toBe(coins);
    expect(getError(state)).toBe(error);
  });
});
