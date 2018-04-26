import Pusher from 'pusher-js';
import { push } from 'react-router-redux';

import { userAccountSetKYCApplied } from './actions/user-account';
import {
  dataFetchAccountDataRequest,
  dataReceiveAccountData
} from './actions/coin-accounts';

let hasBinded = false;

if (process.env.NODE_ENV !== 'production') {
  Pusher.logToConsole = true;
}

function handleStoreChange(store) {
  const { userAccount } = store.getState();

  if (userAccount && userAccount.id) {
    if (hasBinded) {
      return;
    }

    hasBinded = true;

    const pusher = new Pusher('b22bf380283ad7071ee2', {
      wsHost: 'ws.pusherapp.com',
      httpHost: 'sockjs.pusher.com',
      encrypted: true
    });

    const channel = pusher.subscribe(userAccount.id);

    channel.bind('kyc-done', () => {
      setTimeout(() => {
        store.dispatch(userAccountSetKYCApplied(true));
        if (document.location.pathname.indexOf('/kyc') !== -1) {
          store.dispatch(push('/a/btc'));
        }
      }, 2000);

      channel.unbind('kyc-done');
    });

    channel.bind('account-changes', (data) => {
      store.dispatch(dataFetchAccountDataRequest());
      store.dispatch(dataReceiveAccountData(data, data.id));
    });
  }
}

function pusherStoreListener(store) {
  store.subscribe(() => {
    handleStoreChange(store);
  });
}

export default pusherStoreListener;
