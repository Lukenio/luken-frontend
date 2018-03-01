import { SHOW_NEW_ACCOUNT_MODAL, HIDE_NEW_ACCOUNT_MODAL } from '../constants';

export function showNewAccountModal() {
  return { type: SHOW_NEW_ACCOUNT_MODAL };
}

export function hideNewAccountModal() {
  return { type: HIDE_NEW_ACCOUNT_MODAL };
}
