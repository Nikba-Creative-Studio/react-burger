import {
    //FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    //FETCH_INGREDIENTS_FAILURE,
    SELECT_INGREDIENT,
    DESELECT_INGREDIENT
}
from '../actions/burger-ingredients';

const ingredientsInitialState = {
    // Первоначальное состояние ингредиентов бургера
    ingredients: [], // Список ингредиентов
    ingredient: null, // Выбранный ингредиент
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
        
        // Выбор ингредиента
        case SELECT_INGREDIENT:
            return {
                ...state,
                ingredient: action.payload.ingredient
            }
            
            // Отмена выбора ингредиента
            case DESELECT_INGREDIENT:
                return {
                    ...state,
                    ingredient: null
                }
        
        default: 
            return state;
        
    }
}