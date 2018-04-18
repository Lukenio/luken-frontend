// src/reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import modals from './modals';
import coinAccounts from './coinAccounts';
import coinsPrice from './coinsPrice';
import ui from './ui';
import input from './input';
import userAccount from './userAccount';

const rootReducer = combineReducers({
  auth,
  userAccount,
  modals,
  coinAccounts,
  coinsPrice,
  ui,
  input,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
