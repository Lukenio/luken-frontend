import { authLoginUserSuccess } from './auth';
import {
  dataFetchUserAccountData,
  dataReceiveUserAccountData
} from './user-account';
import { dataReceiveAccountsData } from './coin-accounts';
import { batchActions } from 'redux-batch-enhancer';

export function initWithPreCachedData(token, userData) {
  return dispatch => {
    const actions = [authLoginUserSuccess(token), dataFetchUserAccountData()];

    if (userData) {
      actions.push(dataReceiveUserAccountData(userData));

      if (userData.coin_accounts) {
        actions.push(dataReceiveAccountsData(userData.coin_accounts));
      }
    }

    dispatch(batchActions(actions));
  };
}
