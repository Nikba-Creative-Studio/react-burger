import {
    WS_CONNECT_SUCCESS,
    WS_CONNECT_CLOSE,
    WS_GET_ORDER,
    GET_ORDER,
    WS_GET_USER_ORDERS,
    WS_CONNECT_USER_REQUEST
}
from '../actions/feed';

import { IFeedState, TFeedActionTypes } from '../../types/feed';

const initialState: IFeedState = {
    isConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
};

export const feedReducer = (state = initialState, action: TFeedActionTypes): IFeedState => {
    switch (action.type) {
        case WS_CONNECT_SUCCESS:
            return { 
                ...state, 
                isConnected: true 
            };

        case WS_CONNECT_CLOSE:
            return { 
                ...initialState 
            };

        case WS_GET_ORDER:
            return { 
                ...state, 
                ...action.payload.orders
            };
        
        case WS_CONNECT_USER_REQUEST:
            return {
                ...state,
                isConnected: true
            };

        case WS_GET_USER_ORDERS:
            return {
                ...state,
                ...action.payload.orders
            };

        case GET_ORDER:
            return { 
                ...state, 
                ...action.payload 
        };

        default:
            return state;
    }
}