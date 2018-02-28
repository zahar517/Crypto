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
  
    it('getOffset selector returns "some offset" if offset="some offset"', () => {
      const offset = 'some offset';
      const state = {
        currency: { ...initialState, offset }
      };

      expect(getOffset(state)).toBe(offset);
    });

    it('getSelectedCurrency selector returns btc if selected=btc', () => {
      const selected = 'btc';
      const state = {
        currency: { ...initialState, selected }
      };

      expect(getSelectedCurrency(state)).toBe(selected);
    });

    it('getIsBtcLoading selector returns true if isBtcLoading=true', () => {
      const isBtcLoading = true;
      const state = {
        currency: { ...initialState, isBtcLoading }
      };

      expect(getIsBtcLoading(state)).toBe(true);
    });

    it('getIsEthLoading selector returns true if isEthLoading=true', () => {
      const isEthLoading = true;
      const state = {
        currency: { ...initialState, isEthLoading }
      };

      expect(getIsEthLoading(state)).toBe(isEthLoading);
    });

    it('getCurrentCurrencyPurchase selector returns first item purchase value if btc not empty', () => {
      const btc = [{ purchase: 10 }];
      const selected = 'btc';
      const state = {
        currency: { ...initialState, btc, selected }
      };

      expect(getCurrentCurrencyPurchase(state)).toBe(btc[0].purchase);
    });

    it('getCurrentCurrencyPurchase selector returns 0 if btc empty', () => {
      const btc = [];
      const selected = 'btc';
      const state = {
        currency: { ...initialState, btc, selected }
      };

      expect(getCurrentCurrencyPurchase(state)).toBe(0);
    });

    it('getCurrentCurrencySell selector returns first item sell value if eth not empty', () => {
      const eth = [{ sell: 20 }];
      const selected = 'eth';
      const state = {
        currency: { ...initialState, eth, selected }
      };

      expect(getCurrentCurrencySell(state)).toBe(eth[0].sell);
    });

    it('getCurrentCurrencySell selector returns 0 if eth empty', () => {
      const eth = [];
      const selected = 'eth';
      const state = {
        currency: { ...initialState, eth, selected }
      };

      expect(getCurrentCurrencySell(state)).toBe(0);
    });

    it('getCurrentCurrencyQuotes selector returns quotes of eth if selected eth', () => {
      const eth = [{ sell: 20 }];
      const selected = 'eth';
      const state = {
        currency: { ...initialState, eth , selected }
      };

      expect(getCurrentCurrencyQuotes(state)).toEqual(eth);
    });

    it('getBtcPurchase selector returns purchase value of btc first item', () => {
      const btc = [{ purchase: 10 }];
      const state = {
        currency: { ...initialState, btc }
      };

      expect(getBtcPurchase(state)).toBe(btc[0].purchase);
    });

    it('getBtcPurchase selector returns 0 if btc empty', () => {
      const btc = [];
      const state = {
        currency: { ...initialState, btc }
      };

      expect(getBtcPurchase(state)).toBe(0);
    });

    it('getEthPurchase selector returns purchase value of btc first item', () => {
      const eth = [{ purchase: 10 }];
      const state = {
        currency: { ...initialState, eth }
      };

      expect(getEthPurchase(state)).toBe(eth[0].purchase);
    });

    it('getEthPurchase selector returns 0 if btc empty', () => {
      const eth = [];
      const state = {
        currency: { ...initialState, eth }
      };

      expect(getEthPurchase(state)).toBe(0);
    });
  });
});
