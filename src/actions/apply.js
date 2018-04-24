import fetch from 'isomorphic-fetch';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
  APPLY_NEW_LOAN_REQUEST,
  APPLY_NEW_LOAN_SUCCESS,
  APPLY_NEW_LOAN_FAILURE
} from '../constants';
import { errorHandler } from './utils';

function applyNewLoanRequest() {
  return {
    type: APPLY_NEW_LOAN_REQUEST
  };
}

function applyNewLoanSuccess() {
  return {
    type: APPLY_NEW_LOAN_SUCCESS
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
  terms_of_service_agree,
  loaned_amount,
  total_loaned_amount,
  crypto_collateral,
  crypto_type,
  terms_month,
  ltv,
  apr,
  partner_token
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
        apr,
        ltv,
        terms_of_service_agree,
        loaned_amount: parseFloat(loaned_amount.toFixed(2)),
        total_loaned_amount: parseFloat(total_loaned_amount.toFixed(2)),
        crypto_collateral: parseFloat(crypto_collateral.toFixed(8)),
        terms_month: Number(terms_month),
        partner_token
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(applyNewLoanSuccess());
      })
      .catch(error => {
        return errorHandler(dispatch, applyNewLoanFailure, {
          noRedirect: true
        })(error);
      });
  };
}
