// src/reducers/index.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import modals from './modals';
import coinAccounts from './coinAccounts';
import ui from './ui';

const rootReducer = combineReducers({
  auth,
  modals,
  coinAccounts,
  ui,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
