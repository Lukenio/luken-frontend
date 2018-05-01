import {
  DATA_CRYPTO_WITHDRAWAL_REQUEST,
  DATA_CRYPTO_WITHDRAWAL_SUCCESS,
  DATA_CRYPTO_WITHDRAWAL_FAILURE
} from '../constants';

function cryptoWithdrawal(state = {}, action) {
  const { payload } = action;

  switch (action.type) {
    case DATA_CRYPTO_WITHDRAWAL_REQUEST:
    case DATA_CRYPTO_WITHDRAWAL_SUCCESS:
      return {};

    case DATA_CRYPTO_WITHDRAWAL_FAILURE:
      return {
        ...state,
        [payload.accountId]: {
          status: payload.status,
          statusText: payload.statusText
        }
      };

    default:
      return state;
  }
}

export default cryptoWithdrawal;
