import {
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
}
from '../actions/burger-ingredients';

const ingredientsInitialState = {
    // Первоначальное состояние ингредиентов бургера
    ingredients: [], // Список ингредиентов
    constructorIngredients: [], // Список ингредиентов в конструкторе
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    
    // Редюсеры для изменения состояния ингредиентов бургера
    switch(action.type) {

        // Загрузка ингредиентов бургера
        case FETCH_INGREDIENTS_SUCCESS: 
            return {
                ...state,
                ingredients: action.payload.ingredients
            }
        
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                ingredients: []
            }
        
        default: 
            return state;
        
    }
}