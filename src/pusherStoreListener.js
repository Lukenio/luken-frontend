import Pusher from 'pusher-js';
import { push } from 'react-router-redux';

import { userAccountSetKYCApplied } from './actions/user-account';

let hasBinded = false;
let unsubscribe;

function handleStoreChange(store) {
  const { userAccount } = store.getState();
  if (
    userAccount
    && typeof userAccount.kyc_applied !== 'undefined'
    && !userAccount.kyc_applied
  ) {
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
      store.dispatch(userAccountSetKYCApplied(true));
      store.dispatch(push('/a/btc'));
      pusher.disconnect();

      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
  }
}

function pusherStoreListener(store) {
  unsubscribe = store.subscribe(() => {
    handleStoreChange(store);
  });
}

export default pusherStoreListener;
