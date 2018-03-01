import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import { initWithPreCachedData } from './actions';

import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';

const initialState = {};

const history = createHistory();
const store = configureStore(initialState, history);

const token = sessionStorage.getItem('token');

if (token !== null) {
  store.dispatch(initWithPreCachedData(token));
}

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
