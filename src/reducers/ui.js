import { DATA_PICK_NEW_ACCOUNT, HIDE_NEW_ACCOUNT_MODAL } from '../constants';

const defaultState = {
  chosenNewAccount: null
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
    default:
      return state;
  }
}

export default modals;
