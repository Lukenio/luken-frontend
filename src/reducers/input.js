import { SET_LOANED_AMMOUNT_VALUE } from '../constants';

const defaultState = {
  globalLoanedAmountValue: ''
};

export default function coinsPrice(state = defaultState, action) {
  switch (action.type) {
    case SET_LOANED_AMMOUNT_VALUE:
      return {
        ...state,
        globalLoanedAmountValue: action.payload.value
      };
    default:
      return state;
  }
}
