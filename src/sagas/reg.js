import { takeLatest, call, put } from 'redux-saga/effects';
import { regRequest, regSuccess, regFailure } from '../actions/auth';
import { registration } from '../api';

export function* regWorker (action) {
  try {
    const { data: { jwt: token } } = yield call(registration, action.payload);
    yield put(regSuccess(token));
  } catch (error) {
    yield put(regFailure(error.data));
  }
}

export function* regWatcher () {
  yield takeLatest(regRequest, regWorker);
}
