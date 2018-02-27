import { takeEvery, call, put } from 'redux-saga/effects';
import { buyCurrencyRequest, sellCurrencyRequest } from '../actions/currency';
import { buyCurrency, sellCurrency } from '../api';
import { fetchWalletSuccess, fetchWalletFailure } from '../actions/wallet';

export function* buyCurrencyWorker(action) {
  try {
    const { selectedCurrency, value } = action.payload;
    const result = yield call(buyCurrency, selectedCurrency, value);
    yield put(fetchWalletSuccess(result.data));
  } catch(error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* sellCurrencyWorker(action) {
  try {
    const { selectedCurrency, value } = action.payload;
    const result = yield call(sellCurrency, selectedCurrency, value);
    yield put(fetchWalletSuccess(result.data));
  } catch(error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* buyCurrencyWatcher() {
  yield takeEvery(buyCurrencyRequest, buyCurrencyWorker);
}

export function* sellCurrencyWatcher() {
  yield takeEvery(sellCurrencyRequest, sellCurrencyWorker);
}
