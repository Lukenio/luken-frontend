import { DATA_PICK_NEW_ACCOUNT } from '../constants';

export function dataPickNewAccount(data) {
  return {
    type: DATA_PICK_NEW_ACCOUNT,
    payload: {
      data
    }
  };
}
