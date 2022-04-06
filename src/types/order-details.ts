import {
    POST_ORDER_REQUEST, 
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    HIDE_MODAL
}
from '../services/actions/order-details';

export interface IOrderDetailsState {
    order: {},
    orderDetailsModal: boolean,
    isLoading: boolean,
    error: string | null,
}

export interface IOrderRequest {

}

export interface IPostData {
    success: boolean;
    name: string;
    order: {
        number: number,
    }
}

export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: {
        data: IPostData[];
    };
}

export interface IPostOrderFailure {
    readonly type: typeof POST_ORDER_FAILURE;
}

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IHideModal {
    readonly type: typeof HIDE_MODAL;
}


export type TPostOrderActions = IPostOrderRequest | IPostOrderSuccess | IPostOrderFailure | IHideModal;