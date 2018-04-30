import {
  FETCH_LOAN_APPLICATIONS_REQUEST,
  FETCH_LOAN_APPLICATIONS_SUCCESS,
  FETCH_LOAN_APPLICATIONS_FAILURE
} from '../constants';

import { errorHandler, fetchWithToken } from './utils';
import { SERVER_URL } from '../utils/config';

export function fetchLoanApplicationsRequest() {
  return {
    type: FETCH_LOAN_APPLICATIONS_REQUEST
  };
}

export function fetchLoanApplicationsSuccess(data) {
  return {
    type: FETCH_LOAN_APPLICATIONS_SUCCESS,
    payload: {
      data
    }
  };
}

export function fetchLoanApplicationsFailure(error, message) {
  return {
    type: FETCH_LOAN_APPLICATIONS_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function fetchLoanApplications() {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(fetchLoanApplicationsRequest());

    return fetchWithToken(`${SERVER_URL}/api/v1/loan-applications/`, token)
      .then(response => {
        dispatch(fetchLoanApplicationsSuccess(response.results));
      })
      .catch(error => {
        return errorHandler(dispatch, fetchLoanApplicationsFailure)(error);
      });
  };
}
