import {
    SET_INGREDIENTS,
    SET_BUN_TYPE,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAN_CONSTRUCTOR,
}
from '../actions/burger-constructor';
import { TIngredientData } from '../../types/types';
import { IConstructorInitialState, TBurgerConstructorActionTypes } from '../../types/burger-constructor';

const constructorInitialState = {
    ingredients: [] as TIngredientData[],
    buns: null,
}

export const constructorReducer = (state = constructorInitialState, action: TBurgerConstructorActionTypes): IConstructorInitialState => {
    // Редюсеры для конструыктора бургера
    switch (action.type) {
        case SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: [...state.ingredients, action.item]
            }
        case SET_BUN_TYPE:
            return {
                ...state,
                buns: action.item.item,
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients].filter((item: TIngredientData) => item.uid !== action.uid)
            }
        
        case MOVE_INGREDIENT: {
            
            const ingredientsNew = [...state.ingredients]
            ingredientsNew.splice(action.payload.dragIndex, 0, ingredientsNew.splice(action.payload.hoverIndex, 1)[0])

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