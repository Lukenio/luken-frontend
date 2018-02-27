import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import creaateSagaMiddleware from 'redux-saga';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from 'redux/user/reducer';
import rootSaga from 'redux/sagas';

export default function configureStore(history) {
  const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
  });

  const sagaMiddleware = creaateSagaMiddleware();

  let enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools({})(enhancer);
  }

  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
}