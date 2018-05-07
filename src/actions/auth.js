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
  AUTH_LOGOUT_USER,
  AUTH_CLEAN_STATUS_TEXT
} from '../constants';

import { errorHandler } from './utils';
import { dataFetchUserAccountData } from './user-account';
import { dataFetchAccountsDataRequest } from './coin-accounts';

// LOGIN
export function authLoginUserSuccess(token) {
  localStorage.setItem('token', token);

  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

export function authLoginUserFailure(error, message) {
  localStorage.removeItem('token');

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

const successUserLoginBatchedActions = token =>
  batchActions([
    authLoginUserSuccess(token),
    dataFetchAccountsDataRequest(),
    dataFetchUserAccountData(),
    push('/home')
  ]);

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
      .then(({ token }) => {
        dispatch(successUserLoginBatchedActions(token));
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

export function authRegisterUserSuccess(email) {
  localStorage.setItem('email', email);

  return {
    type: AUTH_REGISTER_USER_SUCCESS
  };
}

const successUserRegisterBatchedActions = (email) =>
  batchActions([
    authRegisterUserSuccess(email),
    push('/verification-email-sent')
  ]);

// LOGOUT

export function authInvalidateToken() {
  localStorage.removeItem('token');

  return {
    type: AUTH_INVALIDATE_TOKEN
  };
}

export function authLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
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
        password: password1,
        password_confirm: password2,
        first_name: firstName,
        last_name: lastName,

        // Temporary.
        // We are using email as a login.
        username: email,
        type: 'borrower'
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(successUserRegisterBatchedActions(email));
      })
      .catch(error => {
        return errorHandler(dispatch, authRegisterUserFailure, {
          noRedirect: true
        })(error);
      });
  };
}

export function authCleanStatusText() {
  return {
    type: AUTH_CLEAN_STATUS_TEXT
  };
}
