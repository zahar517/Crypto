import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import wallet from './wallet';
import currency from './currency';

export default combineReducers(
  {
    auth,
    user,
    wallet,
    currency
  }
);
