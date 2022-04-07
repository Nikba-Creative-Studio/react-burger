import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    HIDE_MODAL,
}
from '../actions/order-details';

import { IOrderDetailsState, TPostOrderActions } from '../../types/order-details';

const orderDetailsInitialState: IOrderDetailsState = {
    order: null,
    orderDetailsModal: false,
    isLoading: false,
    error: null,
}
export const orderDetailsReducer = (state = orderDetailsInitialState, action: TPostOrderActions): IOrderDetailsState => { 
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload.data,
                orderDetailsModal: true,
                isLoading: false,
            }
        case POST_ORDER_FAILURE:
            return {
                ...state,
            }
        case HIDE_MODAL:
            return {
                ...state,
                orderDetailsModal: false
            }
        default:
            return state;
    }
}