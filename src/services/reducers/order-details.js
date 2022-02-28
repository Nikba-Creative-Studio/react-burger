import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    HIDE_MODAL,
}
from '../actions/order-details';

const orderDetailsInitialState = {
    order: {},
    orderDetailsModal: false,
    isLoading: false,
    error: null,
}

export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
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
                order: {},
                error: action.payload.error,

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