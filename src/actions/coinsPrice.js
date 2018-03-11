import fetch from 'isomorphic-fetch';

import {
  DATA_FETCH_COINS_PRICE_DATA_REQUEST,
  DATA_RECEIVE_COINS_PRICE_DATA,
  DATA_FETCH_COINS_PRICE_DATA_FAILURE
} from '../constants';

import { errorHandler } from './utils';

import { parseJSON, checkHttpStatus } from '../utils';

function dataFetchCoinsPriceSuccess(data) {
  return {
    type: DATA_RECEIVE_COINS_PRICE_DATA,
    payload: {
      data
    }
  };
}

function dataFetchCoinsPriceFailure(error, message) {
  return {
    type: DATA_FETCH_COINS_PRICE_DATA_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

function dataFetchCoinsPriceRequest() {
  return {
    type: DATA_FETCH_COINS_PRICE_DATA_REQUEST
  };
}

export default function dataFetchCoinsPrice(username, password1) {
  return dispatch => {
    dispatch(dataFetchCoinsPriceRequest());

    return fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(result => {
        dispatch(dataFetchCoinsPriceSuccess(result));
      })
      .catch(error => {
        return errorHandler(dispatch, dataFetchCoinsPriceFailure, {
          noRedirect: true
        })(error);
      });
  };
}
