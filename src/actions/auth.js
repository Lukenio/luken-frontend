import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { batchActions } from 'redux-batch-enhancer';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
  AUTH_INVALIDATE_TOKEN,
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_REGISTER_USER_REQUEST,
  AUTH_REGISTER_USER_FAILURE,
  AUTH_REGISTER_USER_SUCCESS,
  AUTH_LOGOUT_USER
} from '../constants';

import { errorHandler } from './utils';

// LOGIN
export function authLoginUserSuccess(token) {
  sessionStorage.setItem('token', token);

  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

export function authLoginUserFailure(error, message) {
  sessionStorage.removeItem('token');
  return {
    type: AUTH_LOGIN_USER_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function authLoginUserRequest() {
  return {
    type: AUTH_LOGIN_USER_REQUEST
  };
}

export function authLoginUser(username, password1) {
  return dispatch => {
    dispatch(authLoginUserRequest());

    return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: username,
        password: password1
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(({ token, detail }) => {
        dispatch(batchActions([authLoginUserSuccess(token), push('/home')]));
      })
      .catch(error => {
        return errorHandler(dispatch, authLoginUserFailure, {
          noRedirect: true
        })(error);
      });
  };
}

// REGISTER
export function authRegisterUserRequest() {
  return {
    type: AUTH_REGISTER_USER_REQUEST
  };
}

export function authRegisterUserFailure(error, message) {
  return {
    type: AUTH_REGISTER_USER_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function authRegisterUserSuccess() {
  return {
    type: AUTH_REGISTER_USER_SUCCESS
  };
}

// LOGOUT

export function authInvalidateToken() {
  sessionStorage.removeItem('token');

  return {
    type: AUTH_INVALIDATE_TOKEN
  };
}

export function authLogout() {
  sessionStorage.removeItem('token');
  return {
    type: AUTH_LOGOUT_USER
  };
}

export function authLogoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(batchActions([authLogout(), push('/login')]));
    return Promise.resolve();
  };
}

/**
  Auth: Register
*/

export function authRegisterUser({
  email,
  password1,
  password2,
  firstName,
  lastName
}) {
  return dispatch => {
    dispatch(authRegisterUserRequest());
    return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password1,
        password2,
        first_name: firstName,
        last_name: lastName
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(user => {
        dispatch(batchActions([authRegisterUserSuccess(), push('/home')]));
      })
      .catch(error => {
        return errorHandler(dispatch, authRegisterUserFailure, {
          noRedirect: true
        })(error);
      });
  };
}
