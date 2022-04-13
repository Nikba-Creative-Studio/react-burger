import { ingredientsReducer, ingredientsInitialState } from './burger-ingredients';
import { IIngredientsState } from '../../types/burger-ingredients';
import { TIngredientData } from '../../types/types'; 

import { mockBun, mockIngredient, mockIngredientSouce } from '../mockData';

import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} 
from '../actions/burger-ingredients';

describe('ingredientsReducer', () => {

    it ('Изначальный стэйт', () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual({
            ...ingredientsInitialState
        })
    })

    it('Загрузка ингредиентов бургера', () => {
        expect(ingredientsReducer(undefined, {
            type: FETCH_INGREDIENTS_REQUEST,
        })).toEqual({
            ...ingredientsInitialState,
            isLoading: true,
            error: '',
        })
    })

    it('Загрузка ингредиентов бургера успешно', () => {
        const ingredients: TIngredientData[] = [mockBun, mockIngredient, mockIngredientSouce];
        expect(ingredientsReducer(undefined, {
            type: FETCH_INGREDIENTS_SUCCESS,
            payload: {
                ingredients,
            }
        })).toEqual({
            ...ingredientsInitialState,
            isLoading: false,
            ingredients,
        })
    })

    it('Загрузка ингредиентов бургера не успешно', () => {
        const error = 'Ошибка загрузки ингредиентов бургера';
        expect(ingredientsReducer(undefined, {
            type: FETCH_INGREDIENTS_FAILURE,
            payload: {
                error,
            }
        })).toEqual({
            ...ingredientsInitialState,
            isLoading: false,
            error,
        })
    })

});