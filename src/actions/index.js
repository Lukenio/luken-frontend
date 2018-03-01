import { authLoginUserSuccess } from './auth';

export function initWithPreCachedData(token) {
  return dispatch => dispatch(authLoginUserSuccess(token));
}
