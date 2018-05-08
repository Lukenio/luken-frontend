import {
  DATA_PICK_NEW_ACCOUNT,
  NAV_MENU_TOGGLE,
  SIDE_MENU_TOGGLE,
  SET_NEW_LOAN_USER_APPLIED_VALUE
} from '../constants';

export function dataPickNewAccount(data) {
  return {
    type: DATA_PICK_NEW_ACCOUNT,
    payload: {
      data
    }
  };
}

export function handleNavMenuToggle() {
  return {
    type: NAV_MENU_TOGGLE,
    payload: {}
  };
}

export function handleSideMenuToggle() {
  return {
    type: SIDE_MENU_TOGGLE
  };
}

export function setNewLoanUserAppliedValue(value) {
  return {
    type: SET_NEW_LOAN_USER_APPLIED_VALUE,
    payload: { value }
  };
}
