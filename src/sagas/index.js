import { fork } from 'redux-saga/effects';
import { regWatcher } from './reg';
import { loginWatcher } from './login';
import { authFlow } from './auth';
import { userWatcher } from './user';
import { 
  fetchWalletWatch, 
  currencyWatch,
  fetchBtcWatch,
  fetchEthWatch
} from './currency';
import { buyCurrencyWatcher, sellCurrencyWatcher } from './trade';

export default function* () {
  yield fork(authFlow);
  yield fork(regWatcher);
  yield fork(loginWatcher);
  yield fork(userWatcher);
  yield fork(fetchWalletWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(buyCurrencyWatcher);
  yield fork(sellCurrencyWatcher);
};
