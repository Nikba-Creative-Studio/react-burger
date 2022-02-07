
import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Connecting DevTools to Redux
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Add middleware to Redux
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Create Redux store
export const store = createStore(rootReducer, enhancer);