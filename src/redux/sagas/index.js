import { call } from "redux-saga/effects";
import { delay } from 'redux-saga';

function* saga() {
  yield call(delay, 500)
}

export default saga;
