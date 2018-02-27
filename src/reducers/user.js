import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { 
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoFailure
} from '../actions/user';

const isLoading = handleActions(
  {
    [fetchUserInfoRequest]: () => true,
    [fetchUserInfoSuccess]: () => false,
    [fetchUserInfoFailure]: () => false
  },
  false
);

const info = handleActions(
  {
    [fetchUserInfoRequest]: () => null,
    [fetchUserInfoSuccess]: (state, action) => action.payload
  },
  null
);

const error = handleActions(
  {
    [fetchUserInfoRequest]: () => null,
    [fetchUserInfoSuccess]: () => null,
    [fetchUserInfoFailure]: (state, action) => action.payload
  },
  null
)

export const getUserInfoIsLoading = state => state.user.isLoading;
export const getUserInfo = state => state.user.info;
export const getUserInfoError = state => state.user.error;

export default combineReducers(
  {
    isLoading,
    info,
    error
  }
);
