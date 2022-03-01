import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
}
from '../actions/burger-ingredients';

const ingredientsInitialState = {
    // Первоначальное состояние ингредиентов бургера
    ingredients: [], // Список ингредиентов
    constructorIngredients: [], // Список ингредиентов в конструкторе
    isLoading: false, // Флаг загрузки ингредиентов
    error: null, // Ошибка при загрузке ингредиентов
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    
    // Редюсеры для изменения состояния ингредиентов бургера
    switch(action.type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
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