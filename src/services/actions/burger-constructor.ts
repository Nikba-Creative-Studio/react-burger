
import { TIngredientData } from '../../types/types'
import { ISetIngredients, ISetBuns, IRemoveIngredient, IMoveIngredients, ICleanConstructor } from '../../types/burger-constructor'

export const SET_INGREDIENTS: 'SET_INGREDIENTS' = 'SET_INGREDIENTS';
export const SET_BUN_TYPE: 'SET_BUN_TYPE' = 'SET_BUN_TYPE';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAN_CONSTRUCTOR: 'CLEAN_CONSTRUCTOR' = 'CLEAN_CONSTRUCTOR';

export const setIngredients = (item: TIngredientData, uid: string): ISetIngredients => ({
    type: SET_INGREDIENTS,
    item: {
        ...item,
        uid 
    }
});

export const setBuns = (item: TIngredientData, uid: string): ISetBuns => ({
    type: SET_BUN_TYPE,
    item: {
        item,
        uid
    }
});

export const removeIngredient = (uid: string): IRemoveIngredient => ({
    type: REMOVE_INGREDIENT,
    uid: uid
});

export const moveIngredients = (dragIndex: number, hoverIndex: number): IMoveIngredients => ({
    type: MOVE_INGREDIENT,
    payload: {
        dragIndex,
        hoverIndex
    }
});

export const cleanConstructor = (): ICleanConstructor => ({
    type: CLEAN_CONSTRUCTOR
});