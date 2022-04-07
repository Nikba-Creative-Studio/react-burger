
import { rootReducer } from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { ordersUrl } from '../utils/config';

import {
  WS_CONNECT_CLOSE,
  WS_CONNECT_FAILURE,
  WS_CONNECT_REQUEST,
  WS_CONNECT_SUCCESS,
  WS_CONNECT_USER_REQUEST,
  WS_GET_ORDER,
} from './actions/feed';

import { TWsActions } from '../types/feed';

export const wsFeedActions: TWsActions = {
  wsFeedStart: WS_CONNECT_REQUEST,
  onFeedSuccess: WS_CONNECT_SUCCESS,
  onFeedClose: WS_CONNECT_FAILURE,
  onFeedError: WS_CONNECT_CLOSE,
  onFeedOrders: WS_GET_ORDER,
  wsFeedUserStart: WS_CONNECT_USER_REQUEST,
};

// Connecting DevTools to Redux
declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add middleware to Redux
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ordersUrl, wsFeedActions)));

// Create Redux store
export const store = createStore(rootReducer, enhancer);