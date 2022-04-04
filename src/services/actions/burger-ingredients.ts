import { baseUrl } from '../../utils/config';
import { checkResponse } from "../../utils/helpers";

import { IIngredientsRequest, IIngredientsSuccess, IIngredientsFailure} from '../../types/burger-ingredients';
import { TIngredientData } from '../../types/types'
import { AppThunk, AppDispatch } from '../../types/index';

export const FETCH_INGREDIENTS_REQUEST: 'FETCH_INGREDIENTS_REQUEST' = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS: 'FETCH_INGREDIENTS_SUCCESS' = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE: 'FETCH_INGREDIENTS_FAILURE' = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsSuccess = (ingredients: TIngredientData[]): IIngredientsSuccess => ({
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: {
        ingredients
    }
});

export const fetchIngredientsFailure = (error: string): IIngredientsFailure => ({
    type: FETCH_INGREDIENTS_FAILURE,
    payload: {
        error
    }
});

export const fetchIngredientsRequest = (): IIngredientsRequest => ({
    type: FETCH_INGREDIENTS_REQUEST
});


export const fetchIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());
    fetch(`${baseUrl}ingredients`)
        .then(checkResponse)
        .then(response => response.json())
        .then((data) => {
            if(data.success) {
                dispatch(fetchIngredientsSuccess(data.data));
            }
            else {
                dispatch(fetchIngredientsFailure(data.error));
            }
        })
        .catch(error => dispatch(fetchIngredientsFailure(error)));
};
