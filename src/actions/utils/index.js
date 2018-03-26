import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import { batchActions } from 'redux-batch-enhancer';
import { checkHttpStatus, parseJSON } from '../../utils';
import { authInvalidateToken } from '../auth';

const defaultProps = {
  noRedirect: false,
  redirectUrl: '/login'
};

const fieldString = i => `${i[0]} - ${i[1]}`;

const stringifyErrorList = l =>
  l.reduce(
    (acc, i) => (acc === '' ? fieldString(i) : `${acc}</br>${fieldString(i)}`),
    ''
  );

export const errorHandler = (dispatch, failureAction, opts = defaultProps) => (
  error,
  ...other
) => {
  const { noRedirect, redirectUrl } = opts;

  if (
    error &&
    typeof error.response !== 'undefined' &&
    error.response.status === 401
  ) {
    // Invalid authentication credentials
    return error.response.json().then(data => {
      const actions = [
        authInvalidateToken(),
        failureAction(401, data.detail, ...other)
      ];

      if (!noRedirect) {
        actions.push(push(redirectUrl));
      }

      dispatch(batchActions(actions));

      return Promise.reject({ 401: true });
    });
  } else if (
    error &&
    typeof error.response !== 'undefined' &&
    error.response.status >= 500
  ) {
    // Server side error
    dispatch(
      failureAction(
        500,
        'A server error occurred while sending your data!',
        ...other
      )
    );
    return Promise.reject({
      500: 'A server error occurred while sending your data!'
    });
  } else if (
    error &&
    typeof error.response !== 'undefined' &&
    error.response.status === 400
  ) {
    // Bad request error

    return error.response.json().then(data => {
      dispatch(
        failureAction(
          400,
          stringifyErrorList(Object.entries(data)) || data || 'Bad request',
          ...other
        )
      );
      return Promise.reject(data);
    });
  } else {
    // Most likely connection issues
    dispatch(
      failureAction(
        'Connection Error',
        'An error occurred while sending your data!',
        ...other
      )
    );

    return Promise.reject({
      'Connection Error': 'An error occurred while sending your data!'
    });
  }

  return Promise.reject();
};

const baseRequestWithToken = method => (url, token, body) => {
  const d = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    }
  };
  if (body) {
    d.body = JSON.stringify(body);
  }
  return fetch(url, d)
    .then(checkHttpStatus)
    .then(parseJSON);
};

export const fetchWithToken = baseRequestWithToken('GET');
export const postWithToken = baseRequestWithToken('POST');
export const patchWithToken = baseRequestWithToken('PATCH');
export const deleteWithToken = baseRequestWithToken('DELETE');
