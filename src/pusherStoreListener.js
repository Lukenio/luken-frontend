import Pusher from 'pusher-js';
import { push } from 'react-router-redux';
import { notify } from 'reapop';

import { userAccountSetKYCApplied } from './actions/user-account';
import {
  dataFetchAccountDataRequest,
  dataReceiveAccountData
} from './actions/coin-accounts';

let hasBinded = false;
let pusher;

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

    pusher = new Pusher('b22bf380283ad7071ee2', {
      wsHost: 'ws.pusherapp.com',
      httpHost: 'sockjs.pusher.com',
      encrypted: true
    });

    const channel = pusher.subscribe(userAccount.id);

    channel.bind('kyc-done', () => {
      store.dispatch(userAccountSetKYCApplied(true));
      store.dispatch(push('/a/btc'));
      channel.unbind('kyc-done');
    });

    channel.bind('account-changes', (data) => {
      store.dispatch(dataFetchAccountDataRequest());
      store.dispatch(dataReceiveAccountData(data, data.id));
    });

    channel.bind('notification', ({
      title,
      message,
      level: status,
      dismiss: dismissAfter
    }) => {
      store.dispatch(notify({
        title,
        message,
        status: (status || 'INFO').toLowerCase(),
        dismissAfter
      }));
    });
  }
}

function pusherStoreListener(store) {
  store.subscribe(() => {
    handleStoreChange(store);
  });
}

export default pusherStoreListener;
