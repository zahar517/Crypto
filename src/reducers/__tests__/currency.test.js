import currencyReducer, {
  getOffset,
  getBtcPurchase,
  getEthPurchase,
  getCurrentCurrencyQuotes,
  getCurrentCurrencyPurchase,
  getCurrentCurrencySell,
  getSelectedCurrency,
  getIsBtcLoading,
  getIsEthLoading
} from '../currency';
import {
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  selectOffset,
  selectBtc,
  selectEth,
} from '../../actions/currency';
import { combineReducers } from 'redux';

describe('Currency reducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isBtcLoading: false,
      isEthLoading: false,
      btc: [],
      eth: [],
      offset: "7d",
      selected: "eth",
    };
  });

  it('Test initial state', () => {
    const state = currencyReducer(undefined, { type: 'TEST_ACTION' });

    expect(state).toEqual(initialState);
  });

  it('change isBtcLoading flag', () => {
    const state1 = currencyReducer(initialState, fetchBtcRequest());
    const state2 = currencyReducer(state1, fetchBtcSuccess({}));
    const state3 = currencyReducer(state1, fetchBtcFailure({}));

    expect(state1.isBtcLoading).toBeTruthy();
    expect(state2.isBtcLoading).toBeFalsy();
    expect(state3.isBtcLoading).toBeFalsy();
  });

  it('change isEthLoading flag', () => {
    const state1 = currencyReducer(initialState, fetchEthRequest());
    const state2 = currencyReducer(state1, fetchEthSuccess({}));
    const state3 = currencyReducer(state1, fetchEthFailure({}));

    expect(state1.isEthLoading).toBeTruthy();
    expect(state2.isEthLoading).toBeFalsy();
    expect(state3.isEthLoading).toBeFalsy();
  });

  it('fill btc if fetchBtcSuccess', () => {
    const testBtc = [1,2,3];
    const state = currencyReducer(initialState, fetchBtcSuccess(testBtc));

    expect(state.btc).toEqual(testBtc);
  });

  it('fill eth if fetchBtcSuccess', () => {
    const testEth = [1,2,3];
    const state = currencyReducer(initialState, fetchEthSuccess(testEth));
    
    expect(state.eth).toEqual(testEth);
  });

  it('fill offset if dispatch selectOffset', () => {
    const testOffset = 'some offset';
    const state = currencyReducer(initialState, selectOffset(testOffset));
    
    expect(state.offset).toEqual(testOffset);
  });

  it('return selected=btc if selectBtc', () => {
    const state = currencyReducer(initialState, selectBtc());
    
    expect(state.selected).toEqual('btc');
  });

  it('return selected=eth if selectEth', () => {
    const state = currencyReducer(initialState, selectEth());
    
    expect(state.selected).toEqual('eth');
  });

  describe('Currency selectors tests', () => {
    let rootReducer;
    let initialState;

    beforeEach(() => {
      rootReducer = combineReducers({ currency: currencyReducer });
      initialState = rootReducer(undefined, { type: 'TEST_ACTION' });  
    });

    it('getOffset selector returns="some offset" if dispatch selectOffset with payload="some offset"', () => {
      const testOffset = 'some offset';
      const state = rootReducer(initialState, selectOffset(testOffset));

      expect(getOffset(state)).toEqual(testOffset);
    });

    it('getSelectedCurrency selector returns btc if selectBtc', () => {
      const testCurrency = 'btc';
      const state = rootReducer(initialState, selectBtc());

      expect(getSelectedCurrency(state)).toEqual(testCurrency);
    });

    it('getIsBtcLoading selector returns true if fetchBtcRequest', () => {
      const state = rootReducer(initialState, fetchBtcRequest());

      expect(getIsBtcLoading(state)).toBeTruthy();
    });

    it('getIsEthLoading selector returns true if fetchEthRequest', () => {
      const state = rootReducer(initialState, fetchEthRequest());

      expect(getIsEthLoading(state)).toBeTruthy();
    });

    it('getCurrentCurrencyPurchase selector returns first item value if btc not empty', () => {
      const testBtc = [{ purchase: 10 }];
      const state1 = rootReducer(initialState, selectBtc());
      const state2 = rootReducer(state1, fetchBtcSuccess(testBtc));

      expect(getCurrentCurrencyPurchase(state2)).toEqual(testBtc[0].purchase);
    });

    it('getCurrentCurrencyPurchase selector returns 0 if btc empty', () => {
      const testBtc = [];
      const state1 = rootReducer(initialState, selectBtc());
      const state2 = rootReducer(state1, fetchBtcSuccess(testBtc));

      expect(getCurrentCurrencyPurchase(state2)).toEqual(0);
    });

    it('getCurrentCurrencySell selector returns first item value if eth not empty', () => {
      const testEth = [{ sell: 20 }];
      const state1 = rootReducer(initialState, selectEth());
      const state2 = rootReducer(state1, fetchEthSuccess(testEth));

      expect(getCurrentCurrencySell(state2)).toEqual(testEth[0].sell);
    });

    it('getCurrentCurrencySell selector returns 0 if eth empty', () => {
      const testEth = [];      
      const state1 = rootReducer(initialState, selectEth());
      const state2 = rootReducer(state1, fetchEthSuccess(testEth));

      expect(getCurrentCurrencySell(state2)).toEqual(0);
    });

    it('getCurrentCurrencyQuotes selector returns quotes of eth if selectEth', () => {
      const testEth = [{ sell: 20 }];
      const state1 = rootReducer(initialState, selectEth());
      const state2 = rootReducer(state1, fetchEthSuccess(testEth));

      expect(getCurrentCurrencyQuotes(state2)).toEqual(testEth);
    });

    it('getBtcPurchase selector returns purchase value of btc first item', () => {
      const testBtc = [{ purchase: 10 }];
      const state1 = rootReducer(initialState, fetchBtcSuccess(testBtc));

      expect(getBtcPurchase(state1)).toEqual(testBtc[0].purchase);
    });

    it('getBtcPurchase selector returns 0 if btc empty', () => {
      const testBtc = [];
      const state1 = rootReducer(initialState, fetchBtcSuccess(testBtc));

      expect(getBtcPurchase(state1)).toEqual(0);
    });

    it('getEthPurchase selector returns purchase value of btc first item', () => {
      const testEth = [{ purchase: 10 }];
      const state1 = rootReducer(initialState, fetchEthSuccess(testEth));

      expect(getEthPurchase(state1)).toEqual(testEth[0].purchase);
    });

    it('getEthPurchase selector returns 0 if btc empty', () => {
      const testEth = [];
      const state1 = rootReducer(initialState, fetchEthSuccess(testEth));

      expect(getEthPurchase(state1)).toEqual(0);
    });
  });
});
