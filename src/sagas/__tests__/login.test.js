import { loginWatcher, loginWorker } from '../login';
import { takeLatest, call, put } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../../actions/auth';
import { login } from '../../api';

describe('Saga Login tests', () => {
  describe('Test Login Watcher', () => {
    const loginWatcherIterator = loginWatcher();

    it('First step of LoginWatcher iterator', () => {
      const firstStep = loginWatcherIterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(loginRequest, loginWorker));
    });
  
    it('Last step of LoginWatcher iterator', () => {
      const lastStep = loginWatcherIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });

  describe('Test Login Worker success scenario', () => {
    const action = loginRequest('payload');
    const loginWorkerIterator = loginWorker(action);    

    it('First step', () => {
      const firstStep = loginWorkerIterator.next().value;

      expect(firstStep).toEqual(call(login, action.payload));
    });

    it('Second step', () => {
      const data = { data: { jwt: 'token' }};
      const secondStep = loginWorkerIterator.next(data).value;

      expect(secondStep).toEqual(put(loginSuccess(data.data.jwt)));
    });

    it('Last step', () => {
      const lastStep = loginWorkerIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });

  describe('Test Login Worker failure scenario', () => {
    const action = loginRequest('payload');
    const loginWorkerIterator = loginWorker(action);    

    it('First step', () => {
      const firstStep = loginWorkerIterator.next().value;

      expect(firstStep).toEqual(call(login, action.payload));
    });

    it('Second step', () => {
      const error = { data: {error: 'some error' }};
      const secondStep = loginWorkerIterator.throw(error).value;

      expect(secondStep).toEqual(put(loginFailure(error.data)));
    });

    it('Last step', () => {
      const lastStep = loginWorkerIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });
});
