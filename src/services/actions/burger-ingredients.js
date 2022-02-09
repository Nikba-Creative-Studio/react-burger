export const FETCH_INGREDIENTS_REQUEST = 'BURGER/FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'BURGER/FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'BURGER/FETCH_INGREDIENTS_FAILURE';

export const SELECT_INGREDIENT = 'BURGER/SELECT_INGREDIENT';
export const DESELECT_INGREDIENT = 'BURGER/DESELECT_INGREDIENT';

//API Url
const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export function fetchIngredientsSuccess(ingredients) {
    return {
        type: FETCH_INGREDIENTS_SUCCESS,
        payload: {
            ingredients
        }
    }
}

export function fetchIngredientsFailure(error) {
    return {
        type: FETCH_INGREDIENTS_FAILURE,
        payload: {
            error
        }
    }
}

export function fetchIngredients() {
    return function(dispatch) {
        dispatch({
            type: FETCH_INGREDIENTS_REQUEST
        });

        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(ingredients => {
                dispatch(fetchIngredientsSuccess(ingredients.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailure(error));
            });
    }
}

export function selectIngredient(ingredient) {
    return {
        type: SELECT_INGREDIENT,
        payload: {
            ingredient
        }
    }
}

export function deselectIngredient(ingredient) {
    return {
        type: DESELECT_INGREDIENT,
        payload: {
            ingredient
        }
    }
}