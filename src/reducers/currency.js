import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  selectBtc,
  selectEth,
  selectOffset,
} from '../actions/currency';

const selected = handleActions(
  {
    [selectBtc]: () => 'btc',
    [selectEth]: () => 'eth',
  },
  'eth'
);

const offset = handleActions(
  {
    [selectOffset]: (state, action) => action.payload
  },
  '7d'
);

const btc = handleActions(
  {
    [fetchBtcSuccess]: (state, action) => action.payload
  },
  []
);

const eth = handleActions(
  {
    [fetchEthSuccess]: (state, action) => action.payload
  },
  []
);

const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false,
  },
  false
);

const isEthLoading = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false,
  },
  false
);

export const getOffset = state => state.currency.offset;

export const getCurrentCurrencyPurchase = state => {
  const current = state.currency[state.currency.selected];
  return current[0] ? current[0].purchase : 0;
}

export const getCurrentCurrencySell = state => {
  const current = state.currency[state.currency.selected];
  return current[0] ? current[0].sell : 0;
}

export const getSelectedCurrency = state => state.currency.selected;

export const getCurrentCurrencyQuotes = state => {
  const current = state.currency[state.currency.selected];
  return current;
}

export const getBtcPurchase = state => {
  const btc = state.currency.btc[0];
  return btc ? btc.sell : 0;
}

export const getEthPurchase = state => {
  const eth = state.currency.eth[0];
  return eth ? eth.sell : 0;
}

export const getIsBtcLoading = state => state.currency.isBtcLoading;
export const getIsEthLoading = state => state.currency.isEthLoading;

export default combineReducers({
  selected,
  offset,
  btc,
  eth,
  isBtcLoading,
  isEthLoading
});
