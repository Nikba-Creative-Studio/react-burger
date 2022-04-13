import { feedReducer, initialState } from './feed';
import { mockFeedData } from '../mockData';

import {
    WS_CONNECT_SUCCESS,
    WS_CONNECT_CLOSE,
    WS_GET_ORDER,
    GET_ORDER,
    WS_GET_USER_ORDERS,
    WS_CONNECT_USER_REQUEST
}
from '../actions/feed';

describe('feedReducer', () => {
    it ('Изначальный стэйт', () => {
        expect(feedReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Подключение к сокету', () => {
        expect(feedReducer(undefined, {
            type: WS_CONNECT_SUCCESS,
        })).toEqual({
            ...initialState,
            isConnected: true,
        });
    })

    it('Отключение от сокета', () => {
        expect(feedReducer(undefined, {
            type: WS_CONNECT_CLOSE,
        })).toEqual(initialState);
    })

    it('Получение заказов', () => {
        expect(feedReducer(undefined, {
            type: WS_GET_ORDER,
            payload: {
                orders: mockFeedData,
            }
        })).toEqual({
            ...initialState,
            ...mockFeedData,
        });
    })

    it('Получение заказов пользователя', () => {
        expect(feedReducer(undefined, {
            type: WS_GET_USER_ORDERS,
            payload: {
                orders: mockFeedData,
            }
        })).toEqual({
            ...initialState,
            ...mockFeedData,
        });
    })

    it('Получение заказа', () => {
        expect(feedReducer(undefined, {
            type: GET_ORDER,
            payload: {
                order: {...mockFeedData[0]},
            }
        })).toEqual({
            ...initialState,
            order: {...mockFeedData[0]},
        });
    })

    it('Подключение к сокету пользователя', () => {
        expect(feedReducer(undefined, {
            type: WS_CONNECT_USER_REQUEST,
        })).toEqual({
            ...initialState,
            isConnected: true,
        });
    })

});