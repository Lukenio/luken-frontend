import {
  SHOW_NEW_ACCOUNT_MODAL,
  HIDE_NEW_ACCOUNT_MODAL,
  SHOW_WITHDRAW_REQUEST_MODAL,
  HIDE_WITHDRAW_REQUEST_MODAL,
  SHOW_ACCOUNT_ADDRESS_MODAL,
  HIDE_ACCOUNT_ADDRESS_MODAL
} from '../constants';

const defaultState = {
  newAccountModalShown: false,
  newWithdrawalRequestShown: false,
  accountAddressShown: false
};

function modals(state = defaultState, action) {
  switch (action.type) {
    case SHOW_NEW_ACCOUNT_MODAL:
      return {
        ...state,
        newAccountModalShown: true
      };
    case HIDE_NEW_ACCOUNT_MODAL:
      return {
        ...state,
        newAccountModalShown: false
      };
    case SHOW_WITHDRAW_REQUEST_MODAL:
      return {
        ...state,
        newWithdrawalRequestShown: true
      };
    case HIDE_WITHDRAW_REQUEST_MODAL:
      return {
        ...state,
        newWithdrawalRequestShown: false
      };
    case SHOW_ACCOUNT_ADDRESS_MODAL:
      return {
        ...state,
        accountAddressShown: true
      };
    case HIDE_ACCOUNT_ADDRESS_MODAL:
      return {
        ...state,
        accountAddressShown: false
      };
    default:
      return state;
  }
}

export default modals;
