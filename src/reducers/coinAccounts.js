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
  byId: {},
  allIds: [],
  statusText: null
};

const updateById = (state, action) => ({
  byId: {
    ...state.byId,
    [action.payload.data.id]: action.payload.data
  }
});

const updateAllIds = (state, action) => {
  const { id } = action.payload.data;
  const allIds = state.byId[id] ? state.allIds : [...state.allIds, id];
  return { allIds };
};

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
        ...updateAllIds(state, action),
        ...updateById(state, action)
      };
    case DATA_ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...updateAllIds(state, action),
        ...updateById(state, action)
      };
    default:
      return state;
  }
}

export default coinAccounts;
