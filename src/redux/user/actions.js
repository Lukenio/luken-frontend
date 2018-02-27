import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';

export function loginRequest(payload) {
  console.log('$$$$', payload)
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  }
}

export function loginFailure(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  }
}
