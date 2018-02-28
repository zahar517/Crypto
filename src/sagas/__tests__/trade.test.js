import {
  buyCurrencyWatcher,
  buyCurrencyWorker,
  sellCurrencyWatcher,
  sellCurrencyWorker,
  handleError,
  ERROR_MESSAGE
 } from '../trade';
import { takeEvery, call, put } from 'redux-saga/effects';
import { buyCurrencyRequest, sellCurrencyRequest } from '../../actions/currency';
import { buyCurrency, sellCurrency } from '../../api';
import { fetchWalletSuccess, fetchWalletFailure } from '../../actions/wallet';

describe('Trade saga tests', () => {
  describe('buyCurrencyWatcher test', () => {
    const iterator = buyCurrencyWatcher();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeEvery(buyCurrencyRequest, buyCurrencyWorker));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('buyCurrencyWorker success scenariio', () => {
    const payload = { selectedCurrency: 'btc', value: 5 }
    const action = buyCurrencyRequest(payload);
    const iterator = buyCurrencyWorker(action);

    it('First step', () => {
      const firstStep = iterator.next().value;
      const { selectedCurrency, value } = action.payload;

      expect(firstStep).toEqual(call(buyCurrency, selectedCurrency, value));
    });

    it('Second step', () => {
      const result = { data: 'some result' };
      const secondStep = iterator.next(result).value;

      expect(secondStep).toEqual(put(fetchWalletSuccess(result.data)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('buyCurrencyWorker failure scenariio', () => {
    const payload = { selectedCurrency: 'btc', value: 5 }
    const action = buyCurrencyRequest(payload);
    const iterator = buyCurrencyWorker(action);
    const testError = { error: 'some error'};

    it('First step', () => {
      const firstStep = iterator.next().value;
      const { selectedCurrency, value } = action.payload;

      expect(firstStep).toEqual(call(buyCurrency, selectedCurrency, value));
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

  describe('sellCurrencyWatcher test', () => {
    const iterator = sellCurrencyWatcher();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeEvery(sellCurrencyRequest, sellCurrencyWorker));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('sellCurrencyWorker success scenariio', () => {
    const payload = { selectedCurrency: 'btc', value: 5 }
    const action = sellCurrencyRequest(payload);
    const iterator = sellCurrencyWorker(action);

    it('First step', () => {
      const firstStep = iterator.next().value;
      const { selectedCurrency, value } = action.payload;

      expect(firstStep).toEqual(call(sellCurrency, selectedCurrency, value));
    });

    it('Second step', () => {
      const result = { data: 'some result' };
      const secondStep = iterator.next(result).value;

      expect(secondStep).toEqual(put(fetchWalletSuccess(result.data)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('sellCurrencyWorker failure scenariio', () => {
    const payload = { selectedCurrency: 'btc', value: 5 }
    const action = sellCurrencyRequest(payload);
    const iterator = sellCurrencyWorker(action);
    const testError = { error: 'some error'};

    it('First step', () => {
      const firstStep = iterator.next().value;
      const { selectedCurrency, value } = action.payload;

      expect(firstStep).toEqual(call(sellCurrency, selectedCurrency, value));
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

  it('Test hanleError', () => {
    const stringError = 'some error';
    const objectError = { error: 'some error' };

    expect(handleError(stringError)).toEqual(stringError);
    expect(handleError(objectError)).toEqual(ERROR_MESSAGE);
  })
});
