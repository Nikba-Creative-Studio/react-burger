import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
} 
from '../actions/burger-ingredients';

import { IIngredientsState, TBurgerIngredientsActionTypes } from '../../types/burger-ingredients';

export const ingredientsInitialState: IIngredientsState = {
    ingredients: [],
    constructorIngredients: [],
    isLoading: false,
    error: '', 
} 

export const ingredientsReducer = (state = ingredientsInitialState, action: TBurgerIngredientsActionTypes): IIngredientsState => {
    
    // Редюсеры для изменения состояния ингредиентов бургера
    switch(action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: '',
            }

        // Загрузка ингредиентов бургера
        case FETCH_INGREDIENTS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                ingredients: action.payload.ingredients
            }
        
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                ingredients: []
            }
        
        default: 
            return state;
        
    }
}