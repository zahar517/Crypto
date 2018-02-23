import { regWatcher, regWorker } from '../reg';
import { takeLatest, call, put } from 'redux-saga/effects';
import { regRequest, regSuccess, regFailure } from '../../actions/auth';
import { registration } from '../../api';

describe('Saga Login tests', () => {
  describe('Test Login Watcher', () => {
    const regWatcherIterator = regWatcher();

    it('First step of LoginWatcher iterator', () => {
      const firstStep = regWatcherIterator.next().value;
  
      expect(firstStep).toEqual(takeLatest(regRequest, regWorker));
    });
  
    it('Last step of LoginWatcher iterator', () => {
      const lastStep = regWatcherIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });

  describe('Test Login Worker success scenario', () => {
    const action = regRequest('payload');
    const regWorkerIterator = regWorker(action);    

    it('First step', () => {
      const firstStep = regWorkerIterator.next().value;

      expect(firstStep).toEqual(call(registration, action.payload));
    });

    it('Second step', () => {
      const data = { data: { jwt: 'token' }};
      const secondStep = regWorkerIterator.next(data).value;

      expect(secondStep).toEqual(put(regSuccess(data.data.jwt)));
    });

    it('Last step', () => {
      const lastStep = regWorkerIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });

  describe('Test Login Worker failure scenario', () => {
    const action = regRequest('payload');
    const regWorkerIterator = regWorker(action);    

    it('First step', () => {
      const firstStep = regWorkerIterator.next().value;

      expect(firstStep).toEqual(call(registration, action.payload));
    });

    it('Second step', () => {
      const error = { data: {error: 'some error' }};
      const secondStep = regWorkerIterator.throw(error).value;

      expect(secondStep).toEqual(put(regFailure(error.data)));
    });

    it('Last step', () => {
      const lastStep = regWorkerIterator.next();
  
      expect(lastStep).toEqual({ value: undefined, done: true });
    });  
  });
});
