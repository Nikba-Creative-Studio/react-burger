import { orderDetailsReducer, orderDetailsInitialState } from './order-details';
import { mockPostOrder } from '../mockData';

import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    HIDE_MODAL,
}
from '../actions/order-details';

describe('orderDetailsReducer', () => {

    it ('Изначальный стэйт', () => {
        expect(orderDetailsReducer(undefined, {} as any)).toEqual({
            ...orderDetailsInitialState
        })
    })

    it('Загрузка ингредиентов бургера', () => {
        expect(orderDetailsReducer(undefined, {
            type: POST_ORDER_REQUEST,
        })).toEqual({
            ...orderDetailsInitialState,
            isLoading: true,
            error: null,
        })
    })

    it('Загрузка ингредиентов бургера успешно', () => {
        expect(orderDetailsReducer(undefined, {
            type: POST_ORDER_SUCCESS,
            payload: {
                data: mockPostOrder,
            }
        })).toEqual({
            ...orderDetailsInitialState,
            order: mockPostOrder,
            orderDetailsModal: true,
            isLoading: false,
        })
    })

    it('Загрузка ингредиентов бургера неуспешно', () => {
        expect(orderDetailsReducer(undefined, {
            type: POST_ORDER_FAILURE,
        })).toEqual({
            ...orderDetailsInitialState,
            isLoading: false,
        })
    })

    it('Скрыть модальное окно', () => {
        expect(orderDetailsReducer(undefined, {
            type: HIDE_MODAL,
        })).toEqual({
            ...orderDetailsInitialState,
            orderDetailsModal: false,
        })
    })
});