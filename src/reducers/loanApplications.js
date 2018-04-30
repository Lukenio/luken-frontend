

import {
  FETCH_LOAN_APPLICATIONS_REQUEST,
  FETCH_LOAN_APPLICATIONS_SUCCESS,
  FETCH_LOAN_APPLICATIONS_FAILURE
} from '../constants';

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
