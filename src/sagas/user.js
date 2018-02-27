import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  fetchUserInfoRequest, 
  fetchUserInfoSuccess, 
  fetchUserInfoFailure 
} from '../actions/user';
import { getUserInfo } from '../api';

export function* userWorker() {
  try {
    const { data } = yield call(getUserInfo);
    yield put(fetchUserInfoSuccess(data.result));
  } catch(error) {
    yield put(fetchUserInfoFailure(error));
  }
};

export function* userWatcher() {
  yield takeLatest(fetchUserInfoRequest, userWorker);
};
