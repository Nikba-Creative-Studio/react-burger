import { TIngredientData } from './types';
 
import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE
}
from '../services/actions/burger-ingredients';

export interface IIngredientsState {
    ingredients: TIngredientData[];
    constructorIngredients: TIngredientData[];
    isLoading: boolean;
    error: string;
}

export interface IIngredientsRequest {
    readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccess {
    readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
    readonly payload: {
        ingredients: TIngredientData[];
    };
}

export interface IIngredientsFailure {
    readonly type: typeof FETCH_INGREDIENTS_FAILURE;
    readonly payload: {
        error: string;
    };
}

export type TBurgerIngredientsActionTypes = IIngredientsRequest | IIngredientsSuccess | IIngredientsFailure;