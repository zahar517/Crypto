import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure,
} from '../actions/wallet';
import { 
  sellCurrencyRequest, 
  buyCurrencyRequest,
} from '../actions/currency';

const isLoading = handleActions(
  {
    [sellCurrencyRequest]: () => true,
    [buyCurrencyRequest]: () => true,
    [fetchWalletRequest]: () => true,
    [fetchWalletSuccess]: () => false,
    [fetchWalletFailure]: () => false,
  },
  false
);

const coins = handleActions(
  {
    [fetchWalletRequest]: () => {},
    [fetchWalletSuccess]: (state, action) => action.payload
  },
  {}
);

const error = handleActions(
  {
    [sellCurrencyRequest]: () => null,
    [buyCurrencyRequest]: () => null,
    [fetchWalletRequest]: () => null,
    [fetchWalletSuccess]: () => null,
    [fetchWalletFailure]: (state, action) => action.payload
  },
  null
);

export const getIsLoading = state => state.wallet.isLoading;
export const getCoins = state => state.wallet.coins;
export const getError = state => state.wallet.error;

export default combineReducers({
  isLoading,
  coins,
  error
});
