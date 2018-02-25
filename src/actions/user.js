import { createActions } from 'redux-actions';

export const {
  userInfoRequest,
  userInfoSuccess,
  userInfoError
} = createActions(
  'USER_INFO_REQUEST', 
  'USER_INFO_SUCCESS', 
  'USER_INFO_ERROR'
);
