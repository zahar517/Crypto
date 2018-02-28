import {
  fetchBtcFlow,
  fetchBtcWatch,
  fetchEthFlow,
  fetchEthWatch,
  fetchWalletFlow,
  fetchWalletWatch,
  loginCurrencyFlow,
  currencyWatch,
  handleError,
  ERROR_MESSAGE,
  DELAY
} from '../currency';
import {takeLatest, fork, take, select, put, cancel, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import { loginSuccess, regSuccess, logout } from '../../actions/auth';
import {getOffset} from '../../reducers/currency';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,
} from '../../actions/currency';
import {candles, getWallet} from '../../api';
import {fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure} from '../../actions/wallet';
import { createMockTask } from 'redux-saga/utils';

describe('Currency saga tests', () => {
  describe('fetchBtcWatch test', () => {
    const iterator = fetchBtcWatch();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(fetchBtcRequest, fetchBtcFlow));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchEthWatch test', () => {
    const iterator = fetchEthWatch();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(fetchEthRequest, fetchEthFlow));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchWalletWatch test', () => {
    const iterator = fetchWalletWatch();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(fetchWalletRequest, fetchWalletFlow));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchWalletFlow success scenariio', () => {
    const iterator = fetchWalletFlow();

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(getWallet));
    });

    it('Second step', () => {
      const testData = { data: { result: 'some result' }};
      const secondStep = iterator.next(testData).value;

      expect(secondStep).toEqual(put(fetchWalletSuccess(testData.data.result)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchWalletFlow failure scenariio', () => {
    const iterator = fetchWalletFlow();
    const testError = { error: 'some error' };

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(getWallet));
    });

    it('Second step', () => {
      const secondStep = iterator.throw(testError).value;

      expect(secondStep).toEqual(call(handleError, testError));
    });

    it('Third step', () => {
      const handledError = handleError(testError);
      const secondStep = iterator.next(handledError).value;

      expect(secondStep).toEqual(put(fetchWalletFailure(handledError)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchBtcFlow success scenariio', () => {
    const action = fetchBtcRequest('payload');
    const iterator = fetchBtcFlow(action);

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(candles, 'btc', action.payload));
    });

    it('Second step', () => {
      const testData = { data: { result: 'some result' }};
      const secondStep = iterator.next(testData).value;

      expect(secondStep).toEqual(put(fetchBtcSuccess(testData.data.result)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchBtcFlow failure scenariio', () => {
    const action = fetchBtcRequest('payload');
    const iterator = fetchBtcFlow(action);
    const testError = { error: 'some error' };

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(candles, 'btc', action.payload));
    });

    it('Second step', () => {
      const secondStep = iterator.throw(testError).value;

      expect(secondStep).toEqual(call(handleError, testError));
    });

    it('Third step', () => {
      const handledError = handleError(testError);
      const secondStep = iterator.next(handledError).value;

      expect(secondStep).toEqual(put(fetchBtcFailure(handledError)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchEthFlow success scenariio', () => {
    const action = fetchEthRequest('payload');
    const iterator = fetchEthFlow(action);

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(candles, 'eth', action.payload));
    });

    it('Second step', () => {
      const testData = { data: { result: 'some result' }};
      const secondStep = iterator.next(testData).value;

      expect(secondStep).toEqual(put(fetchEthSuccess(testData.data.result)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('fetchEthFlow failure scenariio', () => {
    const action = fetchEthRequest('payload');
    const iterator = fetchEthFlow(action);
    const testError = { error: 'some error' };

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(candles, 'eth', action.payload));
    });

    it('Second step', () => {
      const secondStep = iterator.throw(testError).value;

      expect(secondStep).toEqual(call(handleError, testError));
    });

    it('Third step', () => {
      const handledError = handleError(testError);
      const secondStep = iterator.next(handledError).value;

      expect(secondStep).toEqual(put(fetchEthFailure(handledError)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('loginCurrencyFlow test', () => {
    const iterator = loginCurrencyFlow();
    const offset = 'some offset';

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(select(getOffset));
    });

    it('Second step', () => {
      const secondStep = iterator.next(offset).value

      expect(secondStep).toEqual(put(fetchBtcRequest(offset)));
    });

    it('Third step', () => {
      const thirdStep = iterator.next(offset).value

      expect(thirdStep).toEqual(put(fetchEthRequest(offset)));
    });

    it('Forth step', () => {
      const forthStep = iterator.next().value;

      expect(forthStep).toEqual(call(delay, DELAY));
    });

    it('Last step = first step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(select(getOffset));
    });
  });

  describe('currencyWatch test', () => {
    const iterator = currencyWatch();
    let currencyTask;
    let action;

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(take([loginSuccess, regSuccess, logout, selectBtc, selectEth, selectOffset ]));
    });

    it('Second step', () => {
      action = selectBtc();
      const secondStep = iterator.next(action).value

      expect(secondStep).toEqual(fork(loginCurrencyFlow));
    });

    it('Third step', () => {
      currencyTask = createMockTask();
      const thirdStep = iterator.next(currencyTask).value

      expect(thirdStep).toEqual(take([loginSuccess, regSuccess, logout, selectBtc, selectEth, selectOffset ]));
    });

    it('Forth step', () => {
      action = logout();
      const forthStep = iterator.next(action).value;

      expect(forthStep).toEqual(cancel(currencyTask));
    });

    it('Last step = first step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(take([loginSuccess, regSuccess, logout, selectBtc, selectEth, selectOffset ]));
    });
  });

  it('Test hanleError', () => {
    const stringError = 'some error';
    const objectError = { error: 'some error' };

    expect(handleError(stringError)).toEqual(stringError);
    expect(handleError(objectError)).toEqual(ERROR_MESSAGE);
  });
});
