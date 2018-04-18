import {
  DATA_FETCH_USER_ACCOUNT_DATA_REQUEST,
  DATA_RECEIVE_USER_ACCOUNT_DATA,
  DATA_FETCH_USER_ACCOUNT_DATA_FAILURE
} from '../constants';

import { omit } from '../utils';

const defaultState = {
  isFetching: false,
  statusText: null,
  accountIdsByType: {}
};

export default function userAccount(state = defaultState, action) {
  switch (action.type) {
    case DATA_FETCH_USER_ACCOUNT_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DATA_FETCH_USER_ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };
    case DATA_RECEIVE_USER_ACCOUNT_DATA:
      const { data } = action.payload;

      const userData = omit(data, 'coin_accounts');

      const accountIdsByType = data.coin_accounts
        ? data.coin_accounts.reduce((acc, a) => {
            acc[a.type] = a.id;
            return acc;
          }, {})
        : {};

      return {
        ...state,
        ...userData,
        accountIdsByType,
        isFetching: false
      };

    default:
      return state;
  }
}
