
import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Connecting DevTools to Redux
declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add middleware to Redux
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Create Redux store
export const store = createStore(rootReducer, enhancer);