import { call, put, takeLatest } from 'redux-saga/effects';

import { postData } from 'utils/request';

import {
  LOGIN_REQUEST,  
} from '../constants';

import {
  loginSuccess,
  loginFailure,
} from './actions';

function* loginRequestWorker({ payload }) {
  try {
    const response = yield call(postData, 'api-token-auth/', payload);
    alert(`token: ${response.token}`);
    yield put(loginSuccess(response.token));
  } catch (error) {
    alert('Invalid credential');
  }

}

function* loginRequestWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginRequestWorker);
}

export default [
  loginRequestWatcher(),
];
