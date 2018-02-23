import { put, call, take } from 'redux-saga/effects';
import { loginSuccess, regSuccess, logout } from '../actions/auth';
import { setTokenApi, clearTokenApi } from '../api';
import { 
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';

export function* authFlow() {
  while(true) {
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (localStorageToken) {
      token = localStorageToken;
      yield put(loginSuccess());
    } else {
      const action = yield take([loginSuccess, regSuccess]);
      token = action.payload;
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
