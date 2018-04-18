import { batchActions } from 'redux-batch-enhancer';

import {
  DATA_FETCH_USER_ACCOUNT_DATA_REQUEST,
  DATA_RECEIVE_USER_ACCOUNT_DATA,
  DATA_FETCH_USER_ACCOUNT_DATA_FAILURE
} from '../constants';
import { errorHandler, fetchWithToken } from './utils';

import { SERVER_URL } from '../utils/config';
import { dataReceiveAccountsData } from './coin-accounts';

export function dataFetchUserAccountDataRequest() {
  return {
    type: DATA_FETCH_USER_ACCOUNT_DATA_REQUEST
  };
}

export function dataReceiveUserAccountData(data) {
  localStorage.setItem('user', JSON.stringify(data));

  return {
    type: DATA_RECEIVE_USER_ACCOUNT_DATA,
    payload: {
      data
    }
  };
}

export function dataFetchUserAccountDataFailure(error, message) {
  return {
    type: DATA_FETCH_USER_ACCOUNT_DATA_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function dataFetchUserAccountData() {
  return (dispatch, state) => {
    const { token } = state().auth;

    dispatch(dataFetchUserAccountDataRequest());

    return fetchWithToken(`${SERVER_URL}/api/v1/accounts/profile/`, token)
      .then(response => {
        dispatch(
          batchActions([
            dataReceiveUserAccountData(response),
            dataReceiveAccountsData(response.coin_accounts)
          ])
        );
      })
      .catch(error => {
        return errorHandler(dispatch, dataFetchUserAccountDataFailure)(error);
      });
  };
}
