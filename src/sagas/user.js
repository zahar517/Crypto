import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  fetchUserInfoRequest, 
  fetchUserInfoSuccess, 
  fetchUserInfoFailure 
} from '../actions/user';
import { getUserInfo } from '../api';

export const ERROR_MESSAGE = 'Сервис недоступен';
export const handleError = error => typeof error === 'object' ? ERROR_MESSAGE : error;

export function* userWorker() {
  try {
    const { data } = yield call(getUserInfo);
    yield put(fetchUserInfoSuccess(data.result));
  } catch(error) {
    const errorMessage = yield call(handleError, error);
    yield put(fetchUserInfoFailure(errorMessage));
  }
};

export function* userWatcher() {
  yield takeLatest(fetchUserInfoRequest, userWorker);
};
