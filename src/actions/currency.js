import { createActions } from 'redux-actions';

export const {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,
  buyCurrencyRequest,
  sellCurrencyRequest,
} = createActions(
  'SELECT_BTC',
  'SELECT_ETH',
  'FETCH_BTC_REQUEST',
  'FETCH_BTC_SUCCESS',
  'FETCH_BTC_FAILURE',
  'FETCH_ETH_REQUEST',
  'FETCH_ETH_SUCCESS',
  'FETCH_ETH_FAILURE',
  'SELECT_OFFSET',
  'BUY_CURRENCY_REQUEST',
  'SELL_CURRENCY_REQUEST',
);
