import { fork } from 'redux-saga/effects';
import { regWatcher } from './reg';
import { loginWatcher } from './login';
import { authFlow } from './auth';
import { userWatcher } from './user';

export default function* () {
  yield fork(authFlow);
  yield fork(regWatcher);
  yield fork(loginWatcher);
  yield fork(userWatcher);
};
