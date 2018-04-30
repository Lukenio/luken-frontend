// src/reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

import auth from './auth';
import modals from './modals';
import coinAccounts from './coinAccounts';
import coinsPrice from './coinsPrice';
import ui from './ui';
import input from './input';
import userAccount from './userAccount';
import loanApplications from './loanApplications';

const defaultNotification = {
  position: 'tr',
  dismissible: true,
  dismissAfter: 0
};

const rootReducer = combineReducers({
  auth,
  userAccount,
  modals,
  coinAccounts,
  coinsPrice,
  ui,
  input,
  loanApplications,
  form: formReducer,
  routing: routerReducer,
  notifications: notificationsReducer(defaultNotification)
});

export default rootReducer;
