import {
  DATA_FETCH_ACCOUNT_COINS_DATA_REQUEST,
  DATA_RECEIVE_ACCOUNT_COINS_DATA,
  DATA_FETCH_ACCOUNT_COINS_DATA_FAILURE,
  DATA_ADD_ACCOUNT_SUCCESS,
  DATA_ADD_ACCOUNT_FAILURE,
  DATA_FETCH_ACCOUNT_DATA_REQUEST,
  DATA_RECEIVE_ACCOUNT_DATA,
  DATA_FETCH_ACCOUNT_DATA_FAILURE
} from '../constants';
import { errorHandler, fetchWithToken, postWithToken } from './utils';

import { SERVER_URL } from '../utils/config';

export function dataFetchAccountsDataRequest() {
  return {
    type: DATA_FETCH_ACCOUNT_COINS_DATA_REQUEST
  };
}

export function dataReceiveAccountsData(data) {
  return {
    type: DATA_RECEIVE_ACCOUNT_COINS_DATA,
    payload: {
      data
    }
  };
}

export function dataFetchAccountsDataFailure(error, message) {
  return {
    type: DATA_FETCH_ACCOUNT_COINS_DATA_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function dataFetchAccountsData() {
  return (dispatch, state) => {
    const { token } = state().auth;

    dispatch(dataFetchAccountsDataRequest());

    return fetchWithToken(`${SERVER_URL}/api/v1/coin-accounts/`, token)
      .then(response => {
        dispatch(dataReceiveAccountsData(response.results));
      })
      .catch(error => {
        return errorHandler(dispatch, dataFetchAccountsDataFailure)(error);
      });
  };
}

// FETCH INDIVIDUAL ACCOUNT
export function dataFetchAccountDataRequest() {
  return {
    type: DATA_FETCH_ACCOUNT_DATA_REQUEST
  };
}

export function dataReceiveAccountData(data, accountId) {
  return {
    type: DATA_RECEIVE_ACCOUNT_DATA,
    payload: {
      data,
      accountId
    }
  };
}

export function dataFetchAccountDataFailure(error, message, accountId) {
  return {
    type: DATA_FETCH_ACCOUNT_DATA_FAILURE,
    payload: {
      status: error,
      statusText: message,
      accountId
    }
  };
}

export function dataFetchAccountData(accountId) {
  return (dispatch, state) => {
    const { token } = state().auth;

    dispatch(dataFetchAccountDataRequest());

    return fetchWithToken(
      `${SERVER_URL}/api/v1/coin-accounts/${accountId}/`,
      token
    )
      .then(response => {
        dispatch(dataReceiveAccountData(response, accountId));
      })
      .catch(error => {
        return errorHandler(dispatch, dataFetchAccountDataFailure)(
          error,
          accountId
        );
      });
  };
}

// ADD ACCOUNT
export function dataAddAccountFailure(error, message) {
  return {
    type: DATA_ADD_ACCOUNT_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function dataAddAccountSuccess(data) {
  return {
    type: DATA_ADD_ACCOUNT_SUCCESS,
    payload: {
      data
    }
  };
}

export function dataAddAccount(data) {
  return (dispatch, state) => {
    const { token } = state().auth;

    return postWithToken(`${SERVER_URL}/api/v1/coin-accounts/`, token, data)
      .then(response => {
        dispatch(dataAddAccountSuccess(response));
      })
      .catch(error => {
        debugger;
        return errorHandler(dispatch, dataAddAccountFailure)(error);
      });
  };
}
