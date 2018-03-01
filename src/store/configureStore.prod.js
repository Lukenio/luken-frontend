import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer';

import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
  // Add so dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middlewares = [batchMiddleware, thunk, reduxRouterMiddleware];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), batchStoreEnhancer)
  );
}
