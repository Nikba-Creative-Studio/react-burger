import {
    WS_CONNECT_REQUEST,
    WS_CONNECT_SUCCESS,
    WS_CONNECT_FAILURE,
    WS_GET_ORDER,
    WS_CONNECT_CLOSE,
    WS_CONNECT_USER_REQUEST,
    GET_ORDER
}
from '../services/actions/feed';

export interface IWsOrders {
    _id: string;
    ingredients: string[];
    status: 'done' | 'pending' | 'created';
    name: 'string';
    number: number;
    createdAt?: string;
    updateAt?: string;
}

export interface IFeedState {
    isConnected: boolean;
    success: boolean;
    total: number;
    totalToday: number;
    orders: IWsOrders[];
}

export interface IWsConnectRequest {
    type: typeof WS_CONNECT_REQUEST;
}

export interface IWsConnectSuccess {
    type: typeof WS_CONNECT_SUCCESS;
}

export interface IWsConnectFailure {
    type: typeof WS_CONNECT_FAILURE;
}

export interface IWsConnectClose {
    type: typeof WS_CONNECT_CLOSE;
}

export interface IWsGetOrders {
    type: typeof WS_GET_ORDER;
    payload: {
        orders: IWsOrders[];
    };
}

export interface IGetOrderById {
    type: typeof GET_ORDER;
    payload: {
        order: IWsOrders;
    };
}

export interface IFeedCard {
    readonly time: string | undefined;
    readonly name: string;
    readonly ingredients: Array<string>;
    readonly orderNumber: number;
    readonly status?: string | null;
    readonly id: string;
    readonly pageName: string | undefined;
}

export type IFeedCardStatus = 'done' | 'pending' | 'created';

export type TFeedActionTypes =
    | IWsConnectSuccess
    | IWsConnectRequest
    | IWsConnectClose
    | IWsGetOrders
    | IGetOrderById
    | IWsConnectFailure;
;

export type TWsActions = {
    wsFeedStart: typeof WS_CONNECT_REQUEST;
    onFeedSuccess: typeof WS_CONNECT_SUCCESS;
    onFeedClose: typeof WS_CONNECT_FAILURE;
    onFeedError: typeof WS_CONNECT_CLOSE;
    onFeedOrders: typeof WS_GET_ORDER;
    wsFeedUserStart: typeof WS_CONNECT_USER_REQUEST;
};