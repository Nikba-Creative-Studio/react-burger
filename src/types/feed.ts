import {
    WS_CONNECT_REQUEST,
    WS_CONNECT_SUCCESS,
    WS_CONNECT_FAILURE,
    WS_GET_ORDER,
    WS_CONNECT_CLOSE,
    WS_CONNECT_USER_REQUEST,
    GET_ORDER,
    WS_GET_USER_ORDERS
}
from '../services/actions/feed';

export interface IWsOrders {
    readonly _id: string;
    readonly ingredients: string[];
    readonly status?: 'done' | 'pending' | 'created';
    readonly name: string;
    readonly number: number;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}

export interface IFeedState {
    readonly isConnected: boolean;
    readonly success: boolean;
    readonly total: number;
    readonly totalToday: number;
    readonly orders: IWsOrders[];
}

export interface IWsConnectRequest {
    readonly type: typeof WS_CONNECT_REQUEST;
}

export interface IWsConnectSuccess {
    readonly type: typeof WS_CONNECT_SUCCESS;
}

export interface IWsConnectFailure {
    readonly type: typeof WS_CONNECT_FAILURE;
}

export interface IWsConnectClose {
    readonly type: typeof WS_CONNECT_CLOSE;
}

export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDER;
    readonly payload: {
        readonly orders: IWsOrders[];
    };
}

export interface IWsGetUserOrders {
    readonly type: typeof WS_GET_USER_ORDERS;
    readonly payload: {
        readonly orders: IWsOrders[];
    };
}

export interface IGetOrderById {
    readonly type: typeof GET_ORDER;
    readonly payload: {
        readonly order: IWsOrders;
    };
}

export interface IWsConnectUserRequest {
    readonly type: typeof WS_CONNECT_USER_REQUEST;
}

export type IFeedCardStatus = 'done' | 'pending' | 'created' | null | string | undefined;

export type FeedParams = {
    readonly id: string;
};

export interface IFeedCard {
    readonly time: string | undefined;
    readonly name: string;
    readonly ingredients: Array<string>;
    readonly orderNumber: number;
    readonly status?: IFeedCardStatus ;
    readonly id: string;
    readonly pageName: string | undefined;
}

export type TFeedActionTypes =
    | IWsConnectSuccess
    | IWsConnectRequest
    | IWsConnectClose
    | IWsGetOrders
    | IGetOrderById
    | IWsConnectFailure
    | IWsGetUserOrders
    | IWsConnectUserRequest
    ;
;

export type TWsActions = {
    readonly wsFeedStart: typeof WS_CONNECT_REQUEST;
    readonly onFeedSuccess: typeof WS_CONNECT_SUCCESS;
    readonly onFeedClose: typeof WS_CONNECT_FAILURE;
    readonly onFeedError: typeof WS_CONNECT_CLOSE;
    readonly onFeedOrders: typeof WS_GET_ORDER;
    readonly wsFeedUserStart: typeof WS_CONNECT_USER_REQUEST;
};