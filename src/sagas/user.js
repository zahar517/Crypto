import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  userInfoRequest, 
  userInfoSuccess, 
  userInfoError 
} from '../actions/user';
import { getUserInfo } from '../api';

export function* userWorker() {
  try {
    const result = yield call(getUserInfo);
    console.log(result);
    yield put(userInfoSuccess(result));
  } catch(error) {
    console.log(error);
    yield put(userInfoError(error));
  }
};

export function* userWatcher() {
  yield takeLatest(userInfoRequest, userWorker);
};
