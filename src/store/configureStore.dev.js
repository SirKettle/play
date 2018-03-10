import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware } from 'redux-router5';
import thunk from 'redux-thunk';
import rootStateInjector from './middleware/rootStateInjector';
import analyticsMiddleware from './middleware/analyticsMiddleware';
// import logger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(router, initialState = {}) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(
      router5Middleware(router),
      thunk,
      rootStateInjector,
      analyticsMiddleware
      // logger()
    )
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index.js'); /* eslint global-require: 0 */
      store.replaceReducer(nextRootReducer);
    });
  }

  window.store = store;
  return store;
}
