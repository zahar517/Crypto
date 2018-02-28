import { userWatcher, userWorker, handleError, ERROR_MESSAGE } from '../user';
import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  fetchUserInfoRequest, 
  fetchUserInfoSuccess, 
  fetchUserInfoFailure 
} from '../../actions/user';
import { getUserInfo } from '../../api';

describe('User saga tests', () => {
  describe('userWatcher test', () => {
    const iterator = userWatcher();

    it('first step', () => {
      const firstStep = iterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(fetchUserInfoRequest, userWorker));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('userWorker success scenariio', () => {
    const iterator = userWorker();

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(getUserInfo));
    });

    it('Second step', () => {
      const testData = { data: { result: 'some result' }};
      const secondStep = iterator.next(testData).value;

      expect(secondStep).toEqual(put(fetchUserInfoSuccess(testData.data.result)));
    });

    it('last step', () => {
      const lastStep = iterator.next();

      expect(lastStep).toEqual({ done: true, value: undefined });
    });
  });

  describe('userWorker failure scenariio', () => {
    const iterator = userWorker();
    const testError = { error: 'some error' };

    it('First step', () => {
      const firstStep = iterator.next().value;

      expect(firstStep).toEqual(call(getUserInfo));
    });

    it('Second step', () => {
      const secondStep = iterator.throw(testError).value;

      expect(secondStep).toEqual(call(handleError, testError));
    });

    it('Third step', () => {
      const handledError = handleError(testError);
      const secondStep = iterator.next(handledError).value;

      expect(secondStep).toEqual(put(fetchUserInfoFailure(handledError)));
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
  });
});
