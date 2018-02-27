import { createActions} from 'redux-actions';

export const {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} = createActions(
  'FETCH_WALLET_REQUEST', 
  'FETCH_WALLET_SUCCESS', 
  'FETCH_WALLET_FAILURE'
);
