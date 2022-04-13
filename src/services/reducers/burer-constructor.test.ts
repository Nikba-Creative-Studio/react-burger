import { constructorReducer, constructorInitialState } from './burger-constructor';
import { mockBun, mockIngredient, mockIngredientSouce } from '../mockData';

import {
    SET_INGREDIENTS,
    SET_BUN_TYPE,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAN_CONSTRUCTOR,
}
from '../actions/burger-constructor';

describe('constructorReducer', () => {

    it ('Изначальный стэйт', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual({
            ...constructorInitialState
        })
    })
    
    it('Булка добавленна в Конструктор', () => {
        expect(constructorReducer(undefined, {
            type: SET_BUN_TYPE,
            item: {
                item: mockBun
            }
        })).toEqual({
            ...constructorInitialState,
            buns: mockBun,
        })
    })

    it('Ингредиент добавлен в Конструктор', () => {
        expect(constructorReducer(undefined, {
            type: SET_INGREDIENTS,
            item: mockIngredient
        })).toEqual({
            ...constructorInitialState,
            ingredients: [mockIngredient]
        })
    })

    it('Ингредиент удален из Конструктора', () => {
        expect(constructorReducer(undefined, {
            type: REMOVE_INGREDIENT,
            uid: mockIngredient.uid
        })).toEqual({
            ...constructorInitialState,
            ingredients: []
        })
    })

    it('Ингредиент перемещен в Конструктор', () => {
        const state = {
            ingredients: [mockIngredient, mockIngredientSouce],
            buns: mockBun,
        }

        expect(constructorReducer(state, {
            type: MOVE_INGREDIENT,
            payload: {
                dragIndex: 0,
                hoverIndex: 1
            }
        })).toEqual({
            ...state,
            ingredients: [mockIngredientSouce, mockIngredient]
        })
    })

    it('Конструктор очистен', () => {
        expect(constructorReducer(undefined, {
            type: CLEAN_CONSTRUCTOR,
        })).toEqual({
            ...constructorInitialState
        })
    })
    
});