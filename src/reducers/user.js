import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { 
  userInfoRequest,
  userInfoSuccess,
  userInfoError
} from '../actions/user';

const isLoading = handleActions(
  {
    [userInfoRequest]: () => true,
    [userInfoSuccess]: () => false,
    [userInfoError]: () => false
  },
  false
);

const info = handleActions(
  {
    [userInfoRequest]: () => null,
    [userInfoSuccess]: (state, action) => action.payload
  },
  null
);

const error = handleActions(
  {
    [userInfoRequest]: () => null,
    [userInfoSuccess]: () => null,
    [userInfoError]: () => (state, action) => action.payload
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
