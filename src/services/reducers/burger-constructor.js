import {
    SET_INGREDIENTS,
    SET_BUN_TYPE,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAN_CONSTRUCTOR,
}
from '../actions/burger-constructor';

const constructorInitialState = {
    // Первоначальное состояние конструктора бургера
    ingredients: [], // Список ингредиентов
    buns: null, // Список булочек
}

export const constructorReducer = (state = constructorInitialState, action) => {
    // Редюсеры для конструыктора бургера
    switch (action.type) {
        case SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case SET_BUN_TYPE:
            return {
                ...state,
                buns: action.item,
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.uid !== action.uid)
            }
        
        case MOVE_INGREDIENT: {
            
            const ingredientsNew = [...state.ingredients]
            ingredientsNew.splice(action.dragIndex, 0, ingredientsNew.splice(action.hoverIndex, 1)[0])

            return {
                ...state,
                ingredients: ingredientsNew
            }
        }

        case CLEAN_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [],
                buns: null,
            }

        default: 
            return state;
        
    }
}