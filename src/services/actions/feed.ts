import { AppDispatch } from '../../types/index';
import { baseUrl } from '../../utils/config';
import { 
    IWsConnectRequest,
    IWsConnectSuccess,
    IWsConnectFailure,
    IWsGetOrders,
    IWsConnectClose
 } from '../../types/feed';

export const WS_CONNECT_REQUEST: 'WS_CONNECT_REQUEST' = 'WS_CONNECT_REQUEST';
export const WS_CONNECT_SUCCESS: 'WS_CONNECT_SUCCESS' = 'WS_CONNECT_SUCCESS';
export const WS_CONNECT_FAILURE: 'WS_CONNECT_FAILURE' = 'WS_CONNECT_FAILURE';
export const WS_CONNECT_CLOSE: 'WS_CONNECT_CLOSE' = 'WS_CONNECT_CLOSE';

export const WS_CONNECT_USER_REQUEST: 'WS_CONNECT_USER_REQUEST' = 'WS_CONNECT_USER_REQUEST';
export const WS_CONNECT_USER_SUCCESS: 'WS_CONNECT_USER_SUCCESS' = 'WS_CONNECT_USER_SUCCESS';
export const WS_CONNECT_USER_FAILURE: 'WS_CONNECT_USER_FAILURE' = 'WS_CONNECT_USER_FAILURE';
export const WS_CONNECT_USER_CLOSE: 'WS_CONNECT_USER_CLOSE' = 'WS_CONNECT_USER_CLOSE';

export const WS_GET_ORDER: 'WS_GET_ORDER' = 'WS_GET_ORDER';
export const WS_GET_USER_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS';

export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';

export const wsConnectRequest = (): IWsConnectRequest => ({
    type: WS_CONNECT_REQUEST,
});

export const wsConnectSuccess = (): IWsConnectSuccess => ({
    type: WS_CONNECT_SUCCESS,
});

export const wsConnectFailure = (): IWsConnectFailure => ({
    type: WS_CONNECT_FAILURE,
});

export const wsConnectClose = (): IWsConnectClose => ({
    type: WS_CONNECT_CLOSE,
});

export const wsGetOrders = (orders: any ): IWsGetOrders => ({
    type: WS_GET_ORDER,
    payload: {
        orders
    }
});

export const getFeed = () => (dispatch: AppDispatch) => {
    fetch(`${baseUrl}orders/all`)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error('Failed to fetch orders');
        })
        .then((orders) => {
            dispatch(wsGetOrders(orders));
        })
        .catch(err => {
            console.log(err);
        });
};