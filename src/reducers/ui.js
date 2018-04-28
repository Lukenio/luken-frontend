import {
  DATA_PICK_NEW_ACCOUNT,
  HIDE_NEW_ACCOUNT_MODAL,
  // APPLY_NEW_LOAN_REQUEST,
  APPLY_NEW_LOAN_SUCCESS,
  // APPLY_NEW_LOAN_FAILURE,
  NAV_MENU_TOGGLE,
  SIDE_MENU_TOGGLE
} from '../constants';

const defaultState = {
  chosenNewAccount: null,
  newLoanUserApplied: false,
  mobileMenuOpen: false,
  sideMenuOpen: true
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
    // case APPLY_NEW_LOAN_FAILURE:
    //   return {
    //     ...state,
    //     newLoanError: action.payload.statusText
    //   };
    case NAV_MENU_TOGGLE:
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen
      };
    case SIDE_MENU_TOGGLE:
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen
      };
    default:
      return state;
  }
}

export default modals;
