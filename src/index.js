import React from 'react';
import { render} from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from 'setup/registerServiceWorker';
import configureStore from 'setup/configureStore';
import Routes from 'setup/Routes';

import './index.css';

const history = createHistory();
const store = configureStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
