import { TIngredientData } from './types';

import {
    SET_INGREDIENTS,
    SET_BUN_TYPE,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAN_CONSTRUCTOR
}
from '../services/actions/burger-constructor';

export interface IConstructorInitialState {
    readonly ingredients: TIngredientData[];
    readonly buns: TIngredientData | null;
}

export interface ISetIngredients {
    readonly type: typeof SET_INGREDIENTS;
    readonly item: TIngredientData;
}

export interface ISetBuns {
    readonly type: typeof SET_BUN_TYPE;
    readonly item: {
        readonly item: TIngredientData;
        readonly uid: string;
    };
}

export interface IRemoveIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly uid: string | undefined;
}

export interface IMoveIngredients {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: {
        dragIndex: number,
        hoverIndex: number
    }
}

export interface ICleanConstructor {
    readonly type: typeof CLEAN_CONSTRUCTOR;
}

export type TBurgerConstructorActionTypes =  ISetIngredients | ISetBuns | IRemoveIngredient | IMoveIngredients | ICleanConstructor;