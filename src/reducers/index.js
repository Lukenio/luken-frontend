// src/reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import modals from './modals';
import coinAccounts from './coinAccounts';
import coinsPrice from './coinsPrice';
import ui from './ui';

const rootReducer = combineReducers({
  auth,
  modals,
  coinAccounts,
  coinsPrice,
  ui,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
