import { takeLatest, call, put } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../actions/auth';
import { login } from '../api';

export function* loginWorker (action) {
  try {
    const { data: { jwt: token } } = yield call(login, action.payload);
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginFailure(error.data));
  }
}

export function* loginWatcher () {
  yield takeLatest(loginRequest, loginWorker);
}
