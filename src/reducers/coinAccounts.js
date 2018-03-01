import { combineReducers } from 'redux';

import {
  DATA_FETCH_ACCOUNT_COINS_DATA_REQUEST,
  DATA_RECEIVE_ACCOUNT_COINS_DATA,
  DATA_FETCH_ACCOUNT_COINS_DATA_FAILURE,
  DATA_FETCH_ACCOUNT_DATA_REQUEST,
  DATA_RECEIVE_ACCOUNT_DATA,
  DATA_FETCH_ACCOUNT_DATA_FAILURE,
  DATA_ADD_ACCOUNT_SUCCESS,
  DATA_ADD_ACCOUNT_FAILURE
} from '../constants';

const defaultState = {
  isFetching: false,
  byId: {
    1: {
      id: 1,
      user: 'd7553e9c-265c-44cc-93d7-cc81da5b1858',
      name: 'Bitcoin',
      type: 0,
      pub_address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      vault_id: null,
      created: '2018-03-01T08:21:13+0000',
      updated: '2018-03-01T08:21:13+0000'
    }
  },
  allIds: [1],
  statusText: null
};

const mergeStateWithAccount = (state, action) => ({
  allIds: [...state.allIds, action.payload.data.id],
  byId: {
    ...state.byId,
    [action.payload.data.id]: action.payload.data
  }
});

function coinAccounts(state = defaultState, action) {
  switch (action.type) {
    case DATA_FETCH_ACCOUNT_COINS_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DATA_FETCH_ACCOUNT_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DATA_FETCH_ACCOUNT_COINS_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };
    case DATA_RECEIVE_ACCOUNT_COINS_DATA:
      const allIds = [];
      const byId = {};

      // TODO: Replace it with normalizr
      // Leaving a quick implementation of it for a sake of time spending optimization

      action.payload.data.forEach(d => {
        allIds.push(d.id);
        byId[d.id] = d;
      });

      return {
        ...state,
        isFetching: false,
        allIds,
        byId
      };
    case DATA_ADD_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };
    case DATA_FETCH_ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };
    case DATA_RECEIVE_ACCOUNT_DATA:
      return {
        ...state,
        isFetching: false,
        ...mergeStateWithAccount(state, action)
      };
    case DATA_ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...mergeStateWithAccount(state, action)
      };
    default:
      return state;
  }
}

export default coinAccounts;
