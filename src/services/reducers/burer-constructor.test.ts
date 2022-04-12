import { constructorReducer } from './burger-constructor';
import { IConstructorInitialState } from '../../types/burger-constructor';
import { TIngredientData } from '../../types/types';

import { mockBun, mockIngredient } from '../mockData';

import {
    setIngredients,
    setBuns,
    removeIngredient,
    moveIngredients,
    cleanConstructor
} from '../actions/burger-constructor';

const constructorInitialState: IConstructorInitialState = {
    ingredients: [],
    buns: null, 
}

describe('constructorReducer', () => {

    it ('should return initial state', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual({
            ...constructorInitialState
        })
    })

    it('should return add bun to cart', () => {
        expect(constructorReducer(undefined, setBuns(mockBun, 'abc'))).toEqual({
            ...constructorInitialState,
            buns: {...mockBun}
        })
    })

    it('should return add ingredient to cart', () => {
        expect(constructorReducer(undefined, setIngredients(mockIngredient, 'abc'))).toEqual({
            ...constructorInitialState,
            ingredients: [{...mockIngredient}]
        })
    })

    it('should return remove ingredient from cart', () => {
        const state = {
            buns: {} as TIngredientData,
            ingredients: [mockBun, mockIngredient],
        }

        expect(constructorReducer(state, removeIngredient('abc'))).toEqual({
            ...state,
            ingredients: [...state.ingredients].filter((item: TIngredientData) => item.uid !== 'abc')
        })
    })

    it('should return move ingredient from cart', () => {
        const state = {
            buns: {} as TIngredientData,
            ingredients: [mockBun, mockIngredient],
        }

        expect(constructorReducer(state, moveIngredients(0, 1))).toEqual({
            ...state,
            ingredients: [...state.ingredients].filter((item: TIngredientData) => item.uid !== 'abc')
        })
    })

    it('should return clean constructor', () => {
        const state = {
            buns: {} as TIngredientData,
            ingredients: [mockBun, mockIngredient],
        }

        expect(constructorReducer(state, cleanConstructor())).toEqual({
            ...state,
            ingredients: [],
            buns: null,
        })
    })

  

    

});