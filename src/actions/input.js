import { SET_LOANED_AMMOUNT_VALUE } from '../constants';

export function setGlobalLoanedAmmountValue(value) {
  return {
    type: SET_LOANED_AMMOUNT_VALUE,
    payload: {
      value
    }
  };
}
