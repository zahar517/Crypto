import { fork } from 'redux-saga/effects';
import { regWatcher } from './reg';
import { loginWatcher } from './login';
import { authFlow } from './auth';

export default function* () {
  yield fork(authFlow);
  yield fork(regWatcher);
  yield fork(loginWatcher);
};
