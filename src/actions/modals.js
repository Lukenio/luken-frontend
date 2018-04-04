import {
  SHOW_NEW_ACCOUNT_MODAL,
  HIDE_NEW_ACCOUNT_MODAL,
  SHOW_WITHDRAW_REQUEST_MODAL,
  HIDE_WITHDRAW_REQUEST_MODAL,
  SHOW_ACCOUNT_ADDRESS_MODAL,
  HIDE_ACCOUNT_ADDRESS_MODAL
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
