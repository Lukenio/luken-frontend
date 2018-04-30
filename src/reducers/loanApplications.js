

import {
  FETCH_LOAN_APPLICATIONS_REQUEST,
  FETCH_LOAN_APPLICATIONS_SUCCESS,
  FETCH_LOAN_APPLICATIONS_FAILURE
} from '../constants';

// TODO: Remove this later
const byId = {
  112: {
    "id": 112,
    "loaned_amount": "10000.00",
    "ltv": "0.35",
    "apr": "0.17",
    "email": "info@mexley.com",
    "crypto_collateral": "6.88468158",
    "crypto_price_usd": "8999.34",
    "crypto_type": 0,
    "terms_month": 2,
    "created": "2018-04-25T19:49:35+0000",
    "state": 2,
    "terms_of_service_agree": true,
    "total_loaned_amount": "12048.19",
    "user": "28d3949e-2e3b-4aef-ab9c-be78beeff00d",
    "partner": 1
  },
  113: {
    "id": 113,
    "loaned_amount": "10000.00",
    "ltv": "0.35",
    "apr": "0.17",
    "email": "info@mexley.com",
    "crypto_collateral": "6.88468158",
    "crypto_price_usd": "8999.34",
    "crypto_type": 0,
    "terms_month": 2,
    "created": "2018-04-25T19:49:35+0000",
    "state": 2,
    "terms_of_service_agree": true,
    "total_loaned_amount": "12048.19",
    "user": "28d3949e-2e3b-4aef-ab9c-be78beeff00d",
    "partner": 1
  }
};

const defaultState = {
  isFetching: false,
  statusText: null,
  allIds: [],
  byId: {}
};

function loanApplications(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LOAN_APPLICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    
    case FETCH_LOAN_APPLICATIONS_SUCCESS:
      const allIds = [];
      const byId = {};

      action.payload.data.forEach(l => {
        allIds.push(l.id);
        byId[l.id] = l;
      });

      return {
        ...state,
        isFetching: false,
        allIds,
        byId
      };

    case FETCH_LOAN_APPLICATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusText: `${action.payload.status} - ${action.payload.statusText}`
      };

    default:
      return state;
  }
}

export default loanApplications;
