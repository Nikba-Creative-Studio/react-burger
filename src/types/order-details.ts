import {
    POST_ORDER_REQUEST, 
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    HIDE_MODAL
}
from '../services/actions/order-details';

export interface IPostData {
    readonly success: boolean;
    readonly name: string;
    readonly order: {
        readonly number: number,
    } 
}
export interface IOrderDetailsState {
    readonly order: IPostData[] | null;
    readonly orderDetailsModal: boolean;
    readonly isLoading: boolean;
    readonly error: string | null;
}



export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: {
        data: IPostData[] | null;
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