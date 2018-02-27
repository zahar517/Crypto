import { createActions } from 'redux-actions';

export const {
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoFailure
} = createActions(
  'FETCH_USER_INFO_REQUEST', 
  'FETCH_USER_INFO_SUCCESS', 
  'FETCH_USER_INFO_FAILURE'
);
