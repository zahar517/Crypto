import { authFlow } from '../auth';
import { call, put, take } from 'redux-saga/effects';
import { 
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../../localStorage';
import { setTokenApi, clearTokenApi } from '../../api';
import { loginSuccess, logout, regSuccess } from '../../actions/auth';

describe('Saga Auth tests', () => {

  describe('Test scenariio if localStorageToken exists', () => {
    const authFlowIterator = authFlow();
    const token = 'token';
  
    it('First step', () => {
      const firststep = authFlowIterator.next().value;
  
      expect(firststep).toEqual(call(getTokenFromLocalStorage));
    });
  
    it('Second step', () => {
      const secondStep = authFlowIterator.next(token).value;

      expect(secondStep).toEqual(put(loginSuccess()));
    });

    it('Third step', () => {
      const thirdStep = authFlowIterator.next().value;

      expect(thirdStep).toEqual(call(setTokenApi, token));
    });

    it('Forth step', () => {
      const forthStep = authFlowIterator.next().value;

      expect(forthStep).toEqual(call(setTokenToLocalStorage, token));
    });

    it('Fifth step', () => {
      const fifthStep = authFlowIterator.next().value;

      expect(fifthStep).toEqual(take(logout));
    });

    it('Sixth step', () => {
      const sixthStep = authFlowIterator.next().value;

      expect(sixthStep).toEqual(call(removeTokenFromLocalStorage));
    });

    it('Seventh step', () => {
      const seventhStep = authFlowIterator.next().value;

      expect(seventhStep).toEqual(call(clearTokenApi));
    });

    it('Eights step = First step', () => {
      const firststep = authFlowIterator.next().value;
  
      expect(firststep).toEqual(call(getTokenFromLocalStorage));
    })
  });

  describe('Test scenariio if localStorageToken not exists', () => {
    const authFlowIterator = authFlow();
    let token = '';
  
    it('First step', () => {
      const firststep = authFlowIterator.next().value;
  
      expect(firststep).toEqual(call(getTokenFromLocalStorage));
    });
  
    it('Second step', () => {
      const secondStep = authFlowIterator.next(token).value;

      expect(secondStep).toEqual(take([loginSuccess, regSuccess]));
    });

    it('Third step', () => {
      const action = loginSuccess('token');
      const thirdStep = authFlowIterator.next(action).value;
      token = action.payload;

      expect(thirdStep).toEqual(call(setTokenApi, token));
    });

    it('Forth step', () => {
      const forthStep = authFlowIterator.next().value;

      expect(forthStep).toEqual(call(setTokenToLocalStorage, token));
    });

    it('Fifth step', () => {
      const fifthStep = authFlowIterator.next().value;

      expect(fifthStep).toEqual(take(logout));
    });

    it('Sixth step', () => {
      const sixthStep = authFlowIterator.next().value;

      expect(sixthStep).toEqual(call(removeTokenFromLocalStorage));
    });

    it('Seventh step', () => {
      const seventhStep = authFlowIterator.next().value;

      expect(seventhStep).toEqual(call(clearTokenApi));
    });

    it('Eights step = First step', () => {
      const firststep = authFlowIterator.next().value;
  
      expect(firststep).toEqual(call(getTokenFromLocalStorage));
    })
  });
});
