import {
  SHOW_NEW_ACCOUNT_MODAL,
  HIDE_NEW_ACCOUNT_MODAL,
  SHOW_WITHDRAW_REQUEST_MODAL,
  HIDE_WITHDRAW_REQUEST_MODAL,
  SHOW_ACCOUNT_ADDRESS_MODAL,
  HIDE_ACCOUNT_ADDRESS_MODAL,
  SHOW_NEW_LOAN_MODAL,
  HIDE_NEW_LOAN_MODAL,
  SHOW_CHANGE_PASSWORD_MODAL,
  HIDE_CHANGE_PASSWORD_MODAL
} from '../constants';

export function showNewAccountModal() {
  return { type: SHOW_NEW_ACCOUNT_MODAL };
}

export function hideNewAccountModal() {
  return { type: HIDE_NEW_ACCOUNT_MODAL };
}

export function showWithdrawRequestModal() {
  return { type: SHOW_WITHDRAW_REQUEST_MODAL };
}

export function hideWithdrawRequestModal() {
  return { type: HIDE_WITHDRAW_REQUEST_MODAL };
}

export function showAccountAddressModal() {
  return { type: SHOW_ACCOUNT_ADDRESS_MODAL };
}

export function hideAccountAddressModal() {
  return { type: HIDE_ACCOUNT_ADDRESS_MODAL };
}

export function showNewLoanModal() {
  return { type: SHOW_NEW_LOAN_MODAL };
}

export function hideNewLoanModal() {
  return { type: HIDE_NEW_LOAN_MODAL };
}

export function showChangePasswordModal() {
  return { type: SHOW_CHANGE_PASSWORD_MODAL };
}

export function hideChangePasswordModal() {
  return { type: HIDE_CHANGE_PASSWORD_MODAL };
}
