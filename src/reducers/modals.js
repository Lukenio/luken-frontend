import { SHOW_NEW_ACCOUNT_MODAL, HIDE_NEW_ACCOUNT_MODAL } from '../constants';

const defaultState = {
  newAccountModalShown: false
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
    default:
      return state;
  }
}

export default modals;
