import { createStore } from 'redux';
import rootReducer from './reducers';

export default preloadedState => {
  return createStore(
    rootReducer /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
