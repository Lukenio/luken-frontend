import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { APPLY_NEW_LOAN_REQUEST, APPLY_NEW_LOAN_FAILURE } from '../constants';
import { errorHandler } from './utils';

function applyNewLoanRequest() {
  return {
    type: APPLY_NEW_LOAN_REQUEST
  };
}

function applyNewLoanFailure(error, message) {
  return {
    type: APPLY_NEW_LOAN_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function applyNewLoan({
  email,
  loaned_amount,
  crypto_collateral,
  crypto_type,
  terms_month
}) {
  return dispatch => {
    dispatch(applyNewLoanRequest());

    return fetch(`${SERVER_URL}/api/v1/loan-applications/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        crypto_type,
        loaned_amount: parseFloat(loaned_amount.toFixed(2)),
        crypto_collateral: parseFloat(crypto_collateral.toFixed(8)),
        terms_month: Number(terms_month)
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(d => {
        console.log('success', d);
        // dispatch(push('/'));
      })
      .catch(error => {
        console.error(error);
        // return errorHandler(dispatch, applyNewLoanFailure, {
        //   noRedirect: true
        // })(error);
      });
  };
}
