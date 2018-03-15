import {
  DATA_PICK_NEW_ACCOUNT,
  HIDE_NEW_ACCOUNT_MODAL,
  // APPLY_NEW_LOAN_REQUEST,
  APPLY_NEW_LOAN_SUCCESS,
  // APPLY_NEW_LOAN_FAILURE,
  NAV_MENU_TOGGLE
} from '../constants';

const defaultState = {
  chosenNewAccount: null,
  newLoanUserApplied: false,
  mobileMenuOpen: false
};

function modals(state = defaultState, action) {
  switch (action.type) {
    case DATA_PICK_NEW_ACCOUNT:
      return {
        ...state,
        chosenNewAccount: action.payload.data
      };
    case HIDE_NEW_ACCOUNT_MODAL:
      return {
        ...state,
        chosenNewAccount: null
      };
    case APPLY_NEW_LOAN_SUCCESS:
      return {
        ...state,
        newLoanUserApplied: true
      };
    case NAV_MENU_TOGGLE:
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen
      };
    default:
      return state;
  }
}

export default modals;
