import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer';

import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
  const logger = createLogger();

  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [batchMiddleware, thunk, logger, reduxRouterMiddleware];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), batchStoreEnhancer)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
